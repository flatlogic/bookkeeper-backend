import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import Accounts from "./Accounts";
import GeneralLedger from "./GeneralLedger";

@Entity({name: "general_ledger_accounts_budget"})
@Unique(["account", "generalLedger"])
export default class GeneralLedgerAccountsBudget {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_1_budget", nullable: false})
  public period1Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_2_budget", nullable: false})
  public period2Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_3_budget", nullable: false})
  public period3Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_4_budget", nullable: false})
  public period4Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_5_budget", nullable: false})
  public period5Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_6_budget", nullable: false})
  public period6Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_7_budget", nullable: false})
  public period7Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_8_budget", nullable: false})
  public period8Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_9_budget", nullable: false})
  public period9Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_10_budget", nullable: false})
  public period10Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_11_budget", nullable: false})
  public period11Budget: number = 0;

  @Column({type: "decimal", precision: 5, scale: 2, name: "period_12_budget", nullable: false})
  public period12Budget: number = 0;

  @ManyToOne(() => Accounts)
  public account: Accounts;

  @ManyToOne(() => GeneralLedger)
  public generalLedger: GeneralLedger;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    const {
      period1Budget, period2Budget, period3Budget, period4Budget, period5Budget, period6Budget, period7Budget,
      period8Budget, period9Budget, period10Budget, period11Budget, period12Budget, account,
    }: any = data;

    this.period1Budget = period1Budget;
    this.period2Budget = period2Budget;
    this.period3Budget = period3Budget;
    this.period4Budget = period4Budget;
    this.period5Budget = period5Budget;
    this.period6Budget = period6Budget;
    this.period7Budget = period7Budget;
    this.period8Budget = period8Budget;
    this.period9Budget = period9Budget;
    this.period10Budget = period10Budget;
    this.period11Budget = period11Budget;
    this.period12Budget = period12Budget;
    this.account = account;
  }
}
