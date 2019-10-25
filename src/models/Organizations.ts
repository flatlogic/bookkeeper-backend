import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";

import {BASE_ROLES, STATUSES} from "../constants";
import {getRepository} from "../services/db";
import Addresses from "./Addresses";
import Companies from "./Companies";
import Roles from "./Roles";
import Users from "./Users";

@Entity()
@Unique(["name"])
export default class Organizations {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @Column({nullable: false})
  public name: string;

  @Column({type: "text", nullable: true})
  public description: string;

  @Column({name: "is_deleted", default: false})
  public isDeleted: boolean = false;

  @Column({default: STATUSES.active})
  public status: number = STATUSES.active;

  @ManyToMany(() => Users, (user) => user.organizations, {cascade: true, onDelete: "CASCADE"})
  public users: Users[];

  @OneToMany(() => Roles, (role) => role.organization, {cascade: true, onDelete: "CASCADE"})
  public roles: Roles[];

  @OneToMany(() => Companies, (company) => company.organization, {cascade: true, onDelete: "CASCADE"})
  public companies: Companies[];

  @IsOptional()
  @ValidateNested({ each: true })
  @OneToOne(() => Addresses, {cascade: true, onDelete: "CASCADE"})
  @JoinColumn()
  public physicalAddress: Addresses;

  @IsOptional()
  @ValidateNested({ each: true })
  @OneToOne(() => Addresses, {cascade: true, onDelete: "CASCADE"})
  @JoinColumn()
  public mailingAddress: Addresses;

  constructor(data: any) {
    if (data) {
      this.set(data);
    }
  }

  public async set(data: any = {}) {
    this.name = data.name;
    this.description = data.description;
    this.setAddresses(data);
    await this.setUsers(data.users);
  }

  private setAddresses(data: any = {}) {
    if (data.physicalAddress) {
      this.physicalAddress = this.physicalAddress || new Addresses({});
      this.physicalAddress.set(data.physicalAddress);
    }
    if (data.mailingAddress) {
      this.mailingAddress = this.mailingAddress || new Addresses({});
      this.mailingAddress.set(data.mailingAddress);
    }
  }

  private async setUsers(users: Array<{user: number, role: number|string, company?: number}>) {
    if (!users) {
      return;
    }

    const repository = await getRepository(Users);
    this.users = [];

    const groupedUsers = users.reduce((map: any, user) => {
      const userRoleData: any = { ...user };
      if (user.role === BASE_ROLES.admin) {
        userRoleData.organization = this;
      }
      map[user.user] = map[user.user] || [];
      map[user.user].push(user);
      return map;
    }, {});

    await Promise.all(
      Object.keys(groupedUsers).map(async (userId) => {
        const user = await repository.findOne({
          where: {
            id: userId,
            isDeleted: false,
          },
          relations: ["companyRoles"],
        });
        await user.setRoles(groupedUsers[userId]);
        this.users.push(user);
      })
    );
  }
}
