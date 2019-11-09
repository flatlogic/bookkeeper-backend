import bcrypt from "bcrypt";
import { IsNotEmpty, ValidateNested } from "class-validator";
import crypto from "crypto";
import get from "lodash/get";
import uniqArray from "lodash/uniq";
import {
  Column,
  Entity,
  In,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import { BASE_ROLES, STATUSES } from "../constants";
import { getRepository } from "../services/db";
import Addresses from "./Addresses";
import Companies from "./Companies";
import Organizations from "./Organizations";
import UserCompanyRoles from "./UserCompanyRoles";

@Entity()
@Unique(["username"])
@Unique(["email"])
export default class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({name: "is_deleted", default: false})
  public isDeleted: boolean = false;

  @Column({default: STATUSES.active})
  public status: number = STATUSES.active;

  @IsNotEmpty()
  @Column({nullable: false})
  public username: string;

  @Column({nullable: true, select: false})
  public password: string;

  @IsNotEmpty()
  @Column({name: "first_name", nullable: false})
  public firstName: string;

  @IsNotEmpty()
  @Column({name: "last_name", nullable: false})
  public lastName: string;

  @Column({name: "middle_name", nullable: true})
  public middleName: string;

  @Column({nullable: true})
  public suffix: string;

  @IsNotEmpty()
  @Column({nullable: false})
  public email: string;

  @Column({nullable: true})
  public phone: string;

  @Column({type: "text", array: true, nullable: true , select: false})
  public roles: string[];

  @Column({name: "last_login", precision: 6, type: "timestamptz", nullable: true})
  public lastLogin: Date;

  @Column({name: "password_token", nullable: true, select: false})
  public passwordToken: string;

  @ManyToMany(() => Organizations, (organization) => organization.users)
  @JoinTable({name: "users_organizations"})
  public organizations: Organizations[];

  @ManyToMany(() => Companies, (company) => company.users)
  @JoinTable({name: "users_companies"})
  public companies: Companies[];

  @OneToMany(() => UserCompanyRoles, (companyRole) => companyRole.user, {cascade: true})
  public companyRoles: UserCompanyRoles[];

  @ManyToOne(() => Companies, {cascade: true, onDelete: "CASCADE"})
  @JoinColumn({name: "last_company_selected"})
  public lastCompanySelected: Companies;

  constructor(data: any) {
    if (!data) {
      return;
    }
    this.set(data);
  }

  public async set(data: any = {}) {
    this.firstName = get(data, "firstName", this.firstName);
    this.lastName = get(data, "lastName", this.lastName);
    this.middleName = get(data, "middleName", this.middleName);
    this.suffix = get(data, "suffix", this.suffix);
    this.email = get(data, "email", this.email);
    this.phone = get(data, "phone", this.phone);
    this.username = get(data, "username", this.username);
    this.status = data.status ? 1 : 0;

    if (data.organization) {
      await this.setOrganization(data.organization);
    }

    if (data.roles) {
      await this.setRoles(data.roles);
    }
  }

  public setUserRoles(roles: string[]) {
    this.roles = roles;
  }

  public async setOrganization(id: string|number) {
    const repository = await getRepository(Organizations);
    const result = await repository.findOne(id);
    if (result) {
      this.organizations = [result];
    }
  }

  public async setRoles(roles: Array<{role: string; company?: string|null, organization?: Organizations}>) {
    const repository = await getRepository(UserCompanyRoles);
    this.companyRoles = [];
    this.roles = [];

    const promises = roles.map(async (roleItem) => {
      if (!roleItem.company && roleItem.role === BASE_ROLES.admin) { // set main roles
        this.roles = [roleItem.role];
        // this.organizations = [roleItem.organization];
      } else if (roleItem.company && roleItem.role) { // set other roles
        const result = await repository.findOne({
          where: {
            role: roleItem.role,
            company: roleItem.company,
            user: this.id,
          }
        });
        if (result) {
          this.companyRoles.push(result);
        } else {
          this.companyRoles.push(new UserCompanyRoles({
            role: roleItem.role,
            company: roleItem.company,
            user: this.id || this,
          }));
        }
      }

      const companiesIds = roles
        .filter((item) => item.company)
        .map((item) => +item.company);
      await this.setCompanies(uniqArray(companiesIds));
    });

    return await Promise.all(promises);
  }

  public async setCompanies(ids: number[]) {
    const repository = await getRepository(Companies);
    if (ids && ids.length) {
      this.companies = await repository.find({
        where: {
          id: In(ids),
        },
      });
    } else {
      this.companies = [];
    }

    if (!this.lastCompanySelected) {
      this.lastCompanySelected = this.companies && this.companies.length ? this.companies[0] : null;
    } // @ToDO: reset lastCompanySelected if user has removed this company from the list
  }

  public setPassword(password: string) {
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(password, salt);
    }
  }

  public setPasswordToken() {
    const token = crypto.randomBytes(48).toString("hex");
    return this.passwordToken = token;
  }

  public async setLastCompanySelected(companyId: string|number) {
    const repository = await getRepository(Companies);
    const company = await repository
      .createQueryBuilder("companies")
      .innerJoin(
        "companies.roles", "roles", "roles.company = :company AND roles.user = :user",
        { company: companyId, user: this.id }
      ).getOne();

    if (company) {
      this.lastCompanySelected = company;
    } else {
      throw new Error("User doesn't have access to this company");
    }
  }

  public isAdmin() {
    return this.roles.includes("ADMINISTRATOR");
  }

  public getOrganization() {
    return get(this, "organizations.0");
  }

  public getOrganizationId() {
    return get(this, "organizations.0.id");
  }
}
