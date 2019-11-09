import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import get from "lodash/get";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { isEmpty } from "../services/object";
import Accounts from "./Accounts";
import Addresses from "./Addresses";
import BaseAddress from "./Base/BaseAddress";
import Companies from "./Companies";

@Entity()
export default class Customers {
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

  @Column({name: "contact_email", nullable: true})
  public contactEmail: string;

  @Column({name: "invoice_terms_message", nullable: true}) // message to appear in customer invoices
  public invoiceTermsMessage: string;

  @Column({name: "is_exempt_for_late_fee", nullable: true, default: false})
  public isExemptForLateFee: boolean = false;

  @Column({name: "is_print_statements", nullable: true, default: false})
  public isPrintStatements: boolean = false; // if you want to exclude this Customer from Statements

  @Column({type: "decimal", precision: 15, scale: 2, name: "current_year_billings", nullable: true})
  public currentYearBillings: number;

  @Column({type: "decimal", precision: 15, scale: 2, name: "default_sales_tax_rate", nullable: true})
  public defaultSalesTaxRate: number;

  @Column({name: "default_sales_tax_state_code", nullable: true})
  public defaultSalesTaxStateCode: string;

  @Column({name: "default_sales_tax_district_code", nullable: true})
  public defaultSalesTaxDistrictCode: string;

  @Column({type: "decimal", precision: 15, scale: 2, name: "this_year_billings", nullable: true})
  public thisYearBillings: number;

  @Column({type: "decimal", precision: 15, scale: 2, name: "last_year_billings", nullable: true})
  public lastYearBillings: number;

  @Column({type: "decimal", precision: 15, scale: 2, name: "to_date_billings", nullable: true})
  public toDateBillings: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @OneToOne(() => Addresses, {cascade: true, onDelete: "CASCADE"})
  @JoinColumn()
  public physicalAddress: Addresses;

  @IsOptional()
  @ValidateNested({ each: true })
  @OneToOne(() => Addresses, {cascade: true, onDelete: "CASCADE"})
  @JoinColumn()
  public mailingAddress: Addresses;

  @IsNotEmpty()
  @ManyToOne(() => Companies)
  @JoinColumn({name: "company"})
  public company: Companies;

  @ManyToOne(() => Accounts)
  @JoinColumn({name: "default_account_id"})
  public defaultAccount: Accounts;

  @ManyToOne(() => Accounts)
  @JoinColumn({name: "default_sub_account_id"})
  public defaultSubAccount: Accounts;

  constructor(data = {}) {
    this.set(data);
  }

  public set(data = {}) {
    if (isEmpty(data)) {
      return;
    }

    this.code = get(data, "code", this.code);
    this.status = get(data, "status", this.status);
    this.name = get(data, "name", this.name);
    this.contactPerson = get(data, "contactPerson", this.name);
    this.contactEmail = get(data, "contactEmail", this.name);
    this.invoiceTermsMessage = get(data, "invoiceTermsMessage", this.invoiceTermsMessage);
    this.isExemptForLateFee = !!get(data, "isExemptForLateFee", this.isExemptForLateFee);
    this.isPrintStatements = get(data, "isPrintStatements", this.isPrintStatements);
    this.currentYearBillings = get(data, "currentYearBillings", this.currentYearBillings);
    this.defaultSalesTaxRate = toNumber(get(data, "defaultSalesTaxRate", this.defaultSalesTaxRate));
    this.defaultSalesTaxStateCode = get(data, "defaultSalesTaxStateCode", this.defaultSalesTaxStateCode);
    this.defaultSalesTaxDistrictCode = get(data, "defaultSalesTaxDistrictCode", this.defaultSalesTaxDistrictCode);
    this.thisYearBillings = toNumber(get(data, "thisYearBillings", this.thisYearBillings));
    this.lastYearBillings = toNumber(get(data, "lastYearBillings", this.lastYearBillings));
    this.toDateBillings = toNumber(get(data, "toDateBillings", this.toDateBillings));
    this.defaultAccount = get(data, "defaultAccount", this.defaultAccount);
    this.defaultSubAccount = get(data, "defaultSubAccount", this.defaultSubAccount);
    this.company = get(data, "company", this.company);

    this.setAddresses(data);
  }

  private setAddresses(data: any = {}) {
    if (data.physicalAddress) {
      this.physicalAddress = this.physicalAddress || new Addresses({});
      this.physicalAddress.set(data.physicalAddress);
    }
    if (data.mailingAddress) {
      this.mailingAddress = this.mailingAddress || new Addresses({});
      this.mailingAddress.set(data.mailingAddress);
    }
  }
}

function toNumber(val: any) {
  if (val === "" || val === null || val === undefined) {
    return val;
  } else {
    return +val;
  }
}
