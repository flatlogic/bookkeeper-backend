import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import {getRepository} from "../services/db";
import Organizations from "./Organizations";

@Entity()
@Unique(["name", "organization"])
export default class Roles {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @Column({nullable: false})
  public name: string;

  @Column({nullable: true})
  public description: string;

  @Column({name: "p_general_ledger", type: "text", array: true, nullable: true})
  public pGeneralLedger: string[];

  @Column({name: "p_job_cost", type: "text", array: true, nullable: true})
  public pJobCost: string[];

  @ManyToOne(() => Organizations, (org) => org.roles, {onDelete: "CASCADE"})
  @JoinColumn({ name: "organizationId" })
  public organization: Organizations|number;

  @Column({ nullable: true })
  public organizationId: number;

  constructor(data: any) {
    this.set(data);
  }

  public async set(data: any = {}) {
    this.name = data.name;
    this.description = data.description;

    this.setPermissions(data);
    if (data.organization) {
      await this.setOrganization(data.organization);
    }
  }

  public setPermissions(data: any = {}) {
    this.pGeneralLedger = data.pGeneralLedger;
    this.pJobCost = data.pJobCost;
  }

  public async setOrganization(id: string|number) {
    const repository = await getRepository(Organizations);
    const result = await repository.findOne(id);
    if (result) {
      this.organization = result;
    }
  }
}
