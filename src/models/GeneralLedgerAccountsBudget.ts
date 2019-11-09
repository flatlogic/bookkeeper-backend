import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { IsNotEmpty } from "class-validator";
import Accounts from "./Accounts";
import GeneralLedger from "./GeneralLedger";
import Users from "./Users";

@Entity({name: "general_ledger_accounts_budget"})
@Unique(["account", "generalLedger"])
export default class GeneralLedgerAccountsBudget {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_1_budget", nullable: false})
  public period1Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_2_budget", nullable: false})
  public period2Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_3_budget", nullable: false})
  public period3Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_4_budget", nullable: false})
  public period4Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_5_budget", nullable: false})
  public period5Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_6_budget", nullable: false})
  public period6Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_7_budget", nullable: false})
  public period7Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_8_budget", nullable: false})
  public period8Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_9_budget", nullable: false})
  public period9Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_10_budget", nullable: false})
  public period10Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_11_budget", nullable: false})
  public period11Budget: number = 0;

  @Column({type: "decimal", precision: 20, scale: 2, name: "period_12_budget", nullable: false})
  public period12Budget: number = 0;

  @IsNotEmpty()
  @ManyToOne(() => Accounts, (account) => account.budget, {onDelete: "CASCADE"})
  public account: Accounts;

  @ManyToOne(() => GeneralLedger)
  public generalLedger: GeneralLedger;

  constructor(data: any) {
    if (data) {
      this.set(data);
    }
  }

  public set(data: any = {}) {
    for (let i = 1; i <= 12; i++) {
      // @ts-ignore
      this[`period${i}Budget`] = +data[`period${i}Budget`];
    }

    if (data.account) {
      this.account = data.account;
    }
  }
}
