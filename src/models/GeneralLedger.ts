import { IsBoolean, IsIn, IsInt, IsOptional, Matches, Max, Min } from "class-validator";
import get from "lodash/get";
import moment from "moment";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";

import { STATUSES } from "../constants";
import Accounts from "./Accounts";
import Companies from "./Companies";

// PostgreSQL stores the month as text. The form sends a number and legacy imports send English names.
function ledgerMonth(value: any) {
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") {
    const text = value.trim();
    if (/^\d{1,2}$/.test(text)) {
      return String(Number(text));
    }
    const month = moment(text, ["MMMM", "MMM"], "en", true);
    if (month.isValid()) {
      return month.format("M");
    }
  }
  return value;
}

export function ledgerInteger(value: any) {
  return typeof value === "string" && /^\d+$/.test(value) ? Number(value) : value;
}

@Entity({name: "general_ledger"})
@Unique(["company", "currentFiscalYear"])
export default class GeneralLedger {
  @PrimaryGeneratedColumn()
  public id: number;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_1_month", nullable: false})
  public period1Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_1_status", nullable: false})
  public period1Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_2_month", nullable: false})
  public period2Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_2_status", nullable: false})
  public period2Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_3_month", nullable: false})
  public period3Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_3_status", nullable: false})
  public period3Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_4_month", nullable: false})
  public period4Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_4_status", nullable: false})
  public period4Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_5_month", nullable: false})
  public period5Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_5_status", nullable: false})
  public period5Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_6_month", nullable: false})
  public period6Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_6_status", nullable: false})
  public period6Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_7_month", nullable: false})
  public period7Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_7_status", nullable: false})
  public period7Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_8_month", nullable: false})
  public period8Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_8_status", nullable: false})
  public period8Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_9_month", nullable: false})
  public period9Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_9_status", nullable: false})
  public period9Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_10_month", nullable: false})
  public period10Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_10_status", nullable: false})
  public period10Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_11_month", nullable: false})
  public period11Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_11_status", nullable: false})
  public period11Status: number = STATUSES.active;

  @Matches(/^(?:[1-9]|1[0-2])$/)
  @Column({name: "period_12_month", nullable: false})
  public period12Month: string;

  @IsIn([STATUSES.inactive, STATUSES.active])
  @Column({name: "period_12_status", nullable: false})
  public period12Status: number = STATUSES.active;

  @IsInt()
  @Min(1000)
  @Max(9999)
  @Column({name: "current_fiscal_year", nullable: false})
  public currentFiscalYear: number;

  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(9999)
  @Column({name: "calendar_year_period_1", nullable: true})
  public calendarYearPeriod1: number;

  @IsBoolean()
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

  constructor(data?: any) {
    this.currentFiscalYearOpenedDate = new Date();
    if (data) {
      this.company = data.company;
      this.set(data);
    }
  }

  public set(data: any) {
    const periods = data.budget === undefined ? data : data.budget;
    for (let i = 1; i <= 12; i++) {
      const monthKey = `period${i}Month`;
      const statusKey = `period${i}Status`;
      const month = get(periods, monthKey, get(periods, `period${i}Name`));
      if (month !== undefined) {
        Object.assign(this, { [monthKey]: ledgerMonth(month) });
      }
      const status = get(periods, statusKey);
      if (status !== undefined) {
        Object.assign(this, { [statusKey]: ledgerInteger(status) });
      }
    }

    if (data.currentFiscalYear !== undefined) {
      this.currentFiscalYear = ledgerInteger(data.currentFiscalYear);
    }
    if (data.calendarYearPeriod1 !== undefined) {
      this.calendarYearPeriod1 = ledgerInteger(data.calendarYearPeriod1);
    }

    for (const field of [
      "isPriorFiscalYearClosed", "retainedEarningsAccount", "retainedEarningsSubAccount",
      "lastJournalPosted", "lastFiscalYearPosted", "lastFiscalPeriodPosted",
      "lastFiscalYearBalancePosted", "calYearOf1stPerOfFiscalYear", "reconciliationDate",
    ]) {
      if (data[field] !== undefined) {
        Object.assign(this, { [field]: data[field] });
      }
    }
  }
}
