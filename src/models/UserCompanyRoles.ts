import { IsNotEmpty  } from "class-validator";
import { AfterInsert, AfterUpdate, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

import { getRepository } from "../services/db";
import Companies from "./Companies";
import Roles from "./Roles";
import Users from "./Users";

@Entity({name: "user_company_roles"})
@Unique(["role", "company", "user"])
export default class UserCompanyRoles {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @ManyToOne(() => Roles)
  @JoinColumn({ name: "role_id" })
  public role: Roles;

  @RelationId((userCompanyRoles: UserCompanyRoles) => userCompanyRoles.role)
  public roleId: number;

  @IsNotEmpty()
  @ManyToOne(() => Companies)
  @JoinColumn({ name: "company_id" })
  public company: Companies;

  @RelationId((userCompanyRoles: UserCompanyRoles) => userCompanyRoles.company)
  public companyId: number;

  @IsNotEmpty()
  @ManyToOne(() => Users, (user) => user.companyRoles, {onDelete: "CASCADE"})
  @JoinColumn({ name: "user_id" })
  public user: Users;

  @RelationId((userCompanyRoles: UserCompanyRoles) => userCompanyRoles.user)
  public userId: number;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    this.role = data.role;
    this.company = data.company;
    this.user = data.user;
  }

  @AfterUpdate()
  @AfterInsert()
  private async onUpdated() {
    const repository = await getRepository(UserCompanyRoles);
    await repository.delete({
      user: null,
    });
  }
}
