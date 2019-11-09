import { IsIn, IsNotEmpty, ValidateIf } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import Companies from "./Companies";
import GeneralLedgerAccountsBudget from "./GeneralLedgerAccountsBudget";

export const RESTRICTIONS = {
  njt: "Use with NON-JOB Transactions only",
  jet: "Use only for JOB EXPENSE Transactions",
  jit: "Use only for JOB INCOME Transactions",
  et: "Use only for EQUIPMENT Transactions",
  sbt: "Use only for SERVICE/BLNG Transactions",
};
export const ACCOUNT_TYPES = {
  a: "Asset",
  l: "Liability",
  i: "Income",
  e: "Expense",
};

@Entity()
@Unique(["code", "fiscalYear"])
export default class Accounts {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @Column({nullable: false})
  public code: string;

  @Column({default: 1})
  public status: number = 1;

  @ValidateIf((o) => !o.isSubAccount)
  @IsNotEmpty()
  @Column({name: "fiscal_year", nullable: true})
  public fiscalYear: number;

  @IsNotEmpty()
  @Column({type: "text", nullable: false})
  public description: string;

  @ValidateIf((o) => !o.isSubAccount)
  @IsNotEmpty()
  @IsIn(Object.keys(ACCOUNT_TYPES))
  @Column({nullable: true})
  public type: string;

  @ValidateIf((o) => typeof o.restriction !== "undefined")
  @IsIn([null, ...Object.keys(RESTRICTIONS)])
  @Column({nullable: true})
  public restriction: string;

  @Column({type: "decimal", precision: 5, scale: 2, name: "end_year_adjustment_budget", nullable: true})
  public endYearAdjustmentBudget: number;

  @Column({name: "is_subaccount", nullable: false, default: false})
  public isSubAccount: boolean = false;

  @ManyToOne(() => Accounts)
  @JoinColumn({name: "parent_id"})
  public parent: Accounts;

  @OneToOne(() => GeneralLedgerAccountsBudget)
  public budget: GeneralLedgerAccountsBudget;

  @IsNotEmpty()
  @ManyToOne(() => Companies)
  @JoinColumn({name: "company_id"})
  public company: Companies;

  // TODO: Will be used when we add Auth middleware to fetch Current User + Current Company from the request
  // @IsNotEmpty()
  // @ManyToOne(() => Companies)
  // public company: Companies;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    const {
      code, status, fiscalYear, description, endYearAdjustmentBudget, restriction, type, parent, isSubAccount
    } = data;

    this.code = code;
    this.status = status;
    this.fiscalYear = fiscalYear;
    this.description = description;
    this.endYearAdjustmentBudget = endYearAdjustmentBudget;
    this.restriction = restriction;
    this.type = type;
    this.parent = parent;
    this.isSubAccount = isSubAccount;

    if (data.company) {
      this.company = data.company;
    }
  }
}
