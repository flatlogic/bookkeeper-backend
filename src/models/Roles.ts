import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
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
  public organization: Organizations|number;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    this.name = data.name;
    this.description = data.description;
  }
}
