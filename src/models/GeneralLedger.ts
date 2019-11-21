import get from "lodash/get";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";

import { STATUSES } from "../constants";
import Accounts from "./Accounts";
import Companies from "./Companies";

@Entity({name: "general_ledger"})
@Unique(["company", "currentFiscalYear"])
export default class GeneralLedger {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({name: "period_1_month", nullable: false})
  public period1Month: string;

  @Column({name: "period_1_status", nullable: false})
  public period1Status: number = STATUSES.active;

  @Column({name: "period_2_month", nullable: false})
  public period2Month: string;

  @Column({name: "period_2_status", nullable: false})
  public period2Status: number = STATUSES.active;

  @Column({name: "period_3_month", nullable: false})
  public period3Month: string;

  @Column({name: "period_3_status", nullable: false})
  public period3Status: number = STATUSES.active;

  @Column({name: "period_4_month", nullable: false})
  public period4Month: string;

  @Column({name: "period_4_status", nullable: false})
  public period4Status: number = STATUSES.active;

  @Column({name: "period_5_month", nullable: false})
  public period5Month: string;

  @Column({name: "period_5_status", nullable: false})
  public period5Status: number = STATUSES.active;

  @Column({name: "period_6_month", nullable: false})
  public period6Month: string;

  @Column({name: "period_6_status", nullable: false})
  public period6Status: number = STATUSES.active;

  @Column({name: "period_7_month", nullable: false})
  public period7Month: string;

  @Column({name: "period_7_status", nullable: false})
  public period7Status: number = STATUSES.active;

  @Column({name: "period_8_month", nullable: false})
  public period8Month: string;

  @Column({name: "period_8_status", nullable: false})
  public period8Status: number = STATUSES.active;

  @Column({name: "period_9_month", nullable: false})
  public period9Month: string;

  @Column({name: "period_9_status", nullable: false})
  public period9Status: number = STATUSES.active;

  @Column({name: "period_10_month", nullable: false})
  public period10Month: string;

  @Column({name: "period_10_status", nullable: false})
  public period10Status: number = STATUSES.active;

  @Column({name: "period_11_month", nullable: false})
  public period11Month: string;

  @Column({name: "period_11_status", nullable: false})
  public period11Status: number = STATUSES.active;

  @Column({name: "period_12_month", nullable: false})
  public period12Month: string;

  @Column({name: "period_12_status", nullable: false})
  public period12Status: number = STATUSES.active;

  @Column({name: "current_fiscal_year", nullable: false})
  public currentFiscalYear: number;

  @Column({name: "calendar_year_period_1", nullable: true})
  public calendarYearPeriod1: number;

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

  /* Non-functional fields */
  @Column({name: "last_journal_posted", nullable: true})
  public lastJournalPosted: number;

  @Column({name: "last_fiscal_year_posted", nullable: true})
  public lastFiscalYearPosted: number;

  @Column({name: "last_fiscal_period_posted", nullable: true})
  public lastFiscalPeriodPosted: number;

  @Column({name: "last_fiscal_year_balance_posted", nullable: true})
  public lastFiscalYearBalancePosted: string; // ?

  @Column({name: "reconciliation_date", nullable: true})
  public reconciliationDate: string;

  @Column({name: "calYearOf1stPerOfFiscalYear", nullable: true})
  public calYearOf1stPerOfFiscalYear: string; // ?

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    for (let i = 1; i <= 12; i++) {
      // @ts-ignore
      this[`period${i}Month`] = get(data.budget, `period${i}Month`);
      // @ts-ignore
      this[`period${i}Status`] = get(data.budget, `period${i}Status`);
    }
    this.currentFiscalYear = data.currentFiscalYear;
    this.calendarYearPeriod1 = data.calendarYearPeriod1;
    this.isPriorFiscalYearClosed = data.isPriorFiscalYearClosed;
    this.retainedEarningsAccount = data.retainedEarningsAccount;
    this.retainedEarningsSubAccount = data.retainedEarningsSubAccount;
    this.company = data.company;

    this.lastJournalPosted = data.lastJournalPosted;
    this.lastFiscalYearPosted = data.lastFiscalYearPosted;
    this.lastFiscalPeriodPosted = data.lastFiscalPeriodPosted;
    this.lastFiscalYearBalancePosted = data.lastFiscalYearBalancePosted;
    this.calYearOf1stPerOfFiscalYear = data.calYearOf1stPerOfFiscalYear;
    this.reconciliationDate = data.reconciliationDate;

    if (!this.currentFiscalYearOpenedDate) {
      this.currentFiscalYearOpenedDate = new Date();
    }
  }
}
