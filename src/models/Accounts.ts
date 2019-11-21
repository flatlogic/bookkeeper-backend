import { IsIn, IsNotEmpty, ValidateIf } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import Companies from "./Companies";
import GeneralLedgerAccountsBudget from "./GeneralLedgerAccountsBudget";

export const RESTRICTIONS = {
  nonJob: "njt", // "Use with NON-JOB Transactions only"
  jobExpense: "jet", // "Use only for JOB EXPENSE Transactions",
  jobIncome: "jit", // "Use only for JOB INCOME Transactions",
  equipmentOnly: "et", // "Use only for EQUIPMENT Transactions",
  serviceTransactions: "sbt", // "Use only for SERVICE/BLNG Transactions",
};
export const ACCOUNT_TYPES = {
  asset: "a", // "Asset",
  liability: "l", // "Liability",
  income: "i", // "Income",
  expense: "e", // "Expense",
};
export const RESTRICTIONS_JOB_EXPENSE = {
  subcontract: "jes", // "Subcontract",
  equipment: "jee", // "Equipment",
  labor: "jel", // "Labor",
  materials: "jem", // "Materials",
  laborBurden: "jelb", // "Labor Burden",
  jobOverhead: "jejo", // "Job Overhead",
};
export const RESTRICTIONS_JOB_INCOME = {
  progressBilling: "jipb", // "Progress Billing",
  lumpSumBilling: "jils", // "Lump Sum Billing",
  unitPriceBilling: "jiup", // "Unit Price Billing",
  costPlusBilling: "jicp", // "Cost Plus Billing",
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
  @IsIn(Object.values(ACCOUNT_TYPES))
  @Column({nullable: true})
  public type: string;

  @ValidateIf((o) => typeof o.restriction !== "undefined")
  @IsIn([null, ...Object.values(RESTRICTIONS)])
  @Column({nullable: true})
  public restriction: string;

  @ValidateIf((o) => typeof o.restriction !== "undefined")
  @IsIn([null, ...Object.values(RESTRICTIONS_JOB_EXPENSE), ...Object.values(RESTRICTIONS_JOB_INCOME)])
  @Column({name: "restriction_sub_type", nullable: true})
  public restrictionSubType: string;

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

  /* Non-functional fields */
  @Column({name: "is_posted", nullable: true, default: false})
  public isPosted: boolean = false;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    this.code = data.code;
    this.status = data.status;
    this.fiscalYear = data.fiscalYear;
    this.description = data.description;
    this.endYearAdjustmentBudget = data.endYearAdjustmentBudget;
    this.restriction = data.restriction;
    this.restrictionSubType = data.restrictionSubType;
    this.type = data.type;
    this.parent = data.parent;
    this.isSubAccount = data.isSubAccount;

    if (data.company) {
      this.company = data.company;
    }
  }
}
