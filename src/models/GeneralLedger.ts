import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";

import { STATUSES } from "../constants";
import Accounts from "./Accounts";
import Companies from "./Companies";

@Entity({name: "general_ledger"})
@Unique(["company", "currentFiscalYear"])
export default class GeneralLedger {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({name: "period_1_name", nullable: false})
  public period1Name: string;

  @Column({name: "period_1_status", nullable: false})
  public period1Status: number = STATUSES.active;

  @Column({name: "period_2_name", nullable: false})
  public period2Name: string;

  @Column({name: "period_2_status", nullable: false})
  public period2Status: number = STATUSES.active;

  @Column({name: "period_3_name", nullable: false})
  public period3Name: string;

  @Column({name: "period_3_status", nullable: false})
  public period3Status: number = STATUSES.active;

  @Column({name: "period_4_name", nullable: false})
  public period4Name: string;

  @Column({name: "period_4_status", nullable: false})
  public period4Status: number = STATUSES.active;

  @Column({name: "period_5_name", nullable: false})
  public period5Name: string;

  @Column({name: "period_5_status", nullable: false})
  public period5Status: number = STATUSES.active;

  @Column({name: "period_6_name", nullable: false})
  public period6Name: string;

  @Column({name: "period_6_status", nullable: false})
  public period6Status: number = STATUSES.active;

  @Column({name: "period_7_name", nullable: false})
  public period7Name: string;

  @Column({name: "period_7_status", nullable: false})
  public period7Status: number = STATUSES.active;

  @Column({name: "period_8_name", nullable: false})
  public period8Name: string;

  @Column({name: "period_8_status", nullable: false})
  public period8Status: number = STATUSES.active;

  @Column({name: "period_9_name", nullable: false})
  public period9Name: string;

  @Column({name: "period_9_status", nullable: false})
  public period9Status: number = STATUSES.active;

  @Column({name: "period_10_name", nullable: false})
  public period10Name: string;

  @Column({name: "period_10_status", nullable: false})
  public period10Status: number = STATUSES.active;

  @Column({name: "period_11_name", nullable: false})
  public period11Name: string;

  @Column({name: "period_11_status", nullable: false})
  public period11Status: number = STATUSES.active;

  @Column({name: "period_12_name", nullable: false})
  public period12Name: string;

  @Column({name: "period_12_status", nullable: false})
  public period12Status: number = STATUSES.active;

  @Column({name: "current_fiscal_year", nullable: false})
  public currentFiscalYear: number;

  @Column({name: "is_prior_fiscal_year_closed", nullable: false})
  public isPriorFiscalYearClosed: boolean = false;

  @Column({type: "date", name: "current_fiscal_year_opened", nullable: false})
  public currentFiscalYearOpenedDate: Date;

  @Column({type: "decimal", precision: 5, scale: 2, name: "current_bank_balance", nullable: false})
  public currentBankBalance: number = 0;

  @ManyToOne(() => Accounts)
  public retainedEarningsAccount: Accounts;

  @ManyToOne(() => Accounts)
  public retainedEarningsSubAccount: Accounts;

  @ManyToOne(() => Companies)
  public company: Companies;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    const {
      period1Name, period2Name, period3Name, period4Name, period5Name, period6Name, period7Name, period8Name,
      period9Name, period10Name, period11Name, period12Name, currentFiscalYear, company,
    }: any = data;

    this.period1Name = period1Name;
    this.period2Name = period2Name;
    this.period3Name = period3Name;
    this.period4Name = period4Name;
    this.period5Name = period5Name;
    this.period6Name = period6Name;
    this.period7Name = period7Name;
    this.period8Name = period8Name;
    this.period9Name = period9Name;
    this.period10Name = period10Name;
    this.period11Name = period11Name;
    this.period12Name = period12Name;
    this.currentFiscalYear = currentFiscalYear;
    this.company = company;

    if (!this.currentFiscalYearOpenedDate) {
      this.currentFiscalYearOpenedDate = new Date();
    }
  }
}
