import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import BaseAddress from "./Base/BaseAddress";
import Companies from "./Companies";

@Entity()
export default class Customers extends BaseAddress {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: false})
  public code: string;

  @Column({default: 1})
  public status: number = 1;

  @Column({nullable: false})
  public name: string;

  @Column({nullable: true})
  public address: string;

  @Column({name: "contact_person", nullable: true})
  public contactPerson: string;

  @Column({name: "invoice_terms_message", nullable: true})
  public invoiceTermsMessage: string;

  @Column({name: "is_exempt_for_late_fee", nullable: true})
  public isExemptForLateFee: string;

  @Column({type: "decimal", precision: 5, scale: 2, name: "current_year_billings", nullable: true})
  public currentYearBillings: number;

  @Column({type: "decimal", precision: 5, scale: 2, name: "last_year_billings", nullable: true})
  public lastYearBillings: number;

  // TODO: Will be used when we add Auth middleware to fetch Current User + Current Company from the request
  // @IsNotEmpty()
  // @ManyToOne(() => Companies)
  // public company: Companies;

  // TODO: To be continued

  constructor() {
    super();
  }
}
