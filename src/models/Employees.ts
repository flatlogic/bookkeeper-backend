import {IsIn, IsNotEmpty, IsNumber, Length, Max, ValidateIf} from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Accounts from "./Accounts";
import BaseAddress from "./Base/BaseAddress";
import Companies from "./Companies";

export const MINORITY_CODES = {
  black: "Black",
  hispanic: "Hispanic",
  asian: "Asian",
  indian: "Indian",
  hawaiian: "Hawaiian",
  two_more: "2 / more",
};
export const GENDER_CODES = {
  m: "male",
  f: "female",
};
export const STATUSES = {
  hourly: "Hourly",
  salary: "Salary",
  inactive: "Inactive",
  deceased: "Deceased",
};
export const PAYMENT_FREQUENCY = {
  weekly: "Weekly",
  bi_weekly: "Bi-Weekly",
  monthly: "Monthly",
  semi_monthly: "Semi-Monthly",
  daily: "Daily",
};
export const FEDERAL_WH_TAX_ADJUSTMENT = {
  add_dollar_amount: "Addl $ Amount",
  add_percent_gross: "Addl % of Gross",
  fixed_dollar_amount: "Fixed $ Amount",
  fixed_percent: "Fixed Percent",
  add_percent_tax: "Addl % of Tax",
};
export const FEDERAL_STATUSES = {
  single: "Single",
  married: "Married",
  head_h_hold: "Head of H/Hold",
  exempt: "Exempt",
};

@Entity()
export default class Employees extends BaseAddress {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: false})
  public code: string;

  @Column({name: "is_deleted", default: false})
  public isDeleted: boolean = false;

  @IsIn(Object.keys(STATUSES))
  @Column({nullable: false})
  public status: string;

  @IsNotEmpty()
  @Column({nullable: false})
  public name: string;

  @IsNotEmpty()
  @Column({nullable: false})
  public addressLine1: string;

  @Column({nullable: true})
  public addressLine2: string;

  @IsNotEmpty()
  @Column({nullable: false}) // Do we really need to split it on 3 parts?
  public ssn: string;

  @ValidateIf((o) => typeof o.minority !== "undefined")
  @IsIn([null, ...Object.keys(MINORITY_CODES)])
  @Column({nullable: true})
  public minority: string;

  @IsNotEmpty()
  @IsIn(Object.keys(GENDER_CODES))
  @Column({nullable: false})
  public gender: string;

  @Column({name: "has_pension_plan", nullable: false})
  public hasPensionPlan: boolean = false;

  @IsNotEmpty()
  @Column({type: "date", nullable: false})
  public birthday: Date;

  @IsNotEmpty()
  @Column({type: "date", name: "hire_date", nullable: false})
  public hireDate: Date;

  @Column({type: "date", name: "termination_date", nullable: true})
  public terminationDate: Date;

  @Column({type: "date", name: "rehire_date", nullable: true})
  public rehireDate: Date;

  @Column({type: "date", name: "other_date", nullable: true})
  public otherDate: Date;

  // Used by default to calculate the employee's state withholding taxes
  @IsNotEmpty()
  @Column({name: "state_withholding_code", nullable: false})
  public stateWithholdingCode: string;

  @IsNotEmpty()
  @Column({name: "state_sui_sdi_code", nullable: false})
  public stateSUIorSDICode: string;

  @Column({name: "local_taxes_code", nullable: true})
  public localTaxesCode: string;

  @ValidateIf((o) => (
    typeof o.telAreaCode2 !== "undefined" || typeof o.telAreaCode2 !== "undefined" ||
    typeof o.telAreaCode2 !== "undefined"
  ))
  @IsNotEmpty()
  @IsNumber()
  @Length(3, 3)
  @Column({name: "tel_area_code_2", nullable: true})
  public telAreaCode2: number;

  @ValidateIf((o) => (
    typeof o.telAreaCode2 !== "undefined" || typeof o.telAreaCode2 !== "undefined" ||
    typeof o.telAreaCode2 !== "undefined"
  ))
  @IsNotEmpty()
  @IsNumber()
  @Length(3, 3)
  @Column({name: "tel_prefix_2", nullable: false})
  public telPrefix2: number;

  @ValidateIf((o) => (
    typeof o.telAreaCode2 !== "undefined" || typeof o.telAreaCode2 !== "undefined" ||
    typeof o.telAreaCode2 !== "undefined"
  ))
  @IsNotEmpty()
  @IsNumber()
  @Length(4, 4)
  @Column({name: "tel_number_2", nullable: false})
  public telNumber2: number;

  @IsNotEmpty()
  @IsIn(Object.keys(PAYMENT_FREQUENCY))
  @Column({name: "payment_frequency", nullable: false})
  public paymentFrequency: string;

  @Column({name: "is_excluded_certified_payroll", nullable: false})
  public isExcludedCertifiedPayroll: boolean = false;

  // Number of withholding allowances this employee is claiming on the Federal W-4 Form
  @ValidateIf((o) => typeof o.federalWithholdingAllowances !== "undefined")
  @IsNumber()
  @Max(99)
  @Column({name: "federal_withholding_allowances", nullable: true})
  public federalWithholdingAllowances: number;

  @IsIn(Object.keys(FEDERAL_STATUSES))
  @Column({name: "federal_status", nullable: false})
  public federalStatus: string;

  @ValidateIf((o) => typeof o.federalWithholdingTaxAdjustment !== "undefined")
  @IsIn([null, ...Object.keys(FEDERAL_WH_TAX_ADJUSTMENT)])
  @Column({name: "federal_withholding_tax_adjustment", nullable: true})
  public federalWithholdingTaxAdjustment: string;

  @Column({type: "decimal", precision: 5, scale: 2, name: "federal_withholding_tax_amount", nullable: true})
  public federalWithholdingTaxAmount: number;

  @ValidateIf((o) => typeof o.status === STATUSES.salary)
  @IsNotEmpty()
  @IsNumber()
  @Column({type: "decimal", precision: 5, scale: 2, name: "salary_amount", nullable: true})
  public salaryAmount: number;

  @Column({name: "print_details_check_stub", nullable: false})
  public printDetailsCheckStub: boolean = false;

  @ValidateIf((o) => typeof o.driverLicense !== "undefined")
  @Length(15, 15)
  @Column({name: "driver_license", nullable: true})
  public driverLicense: string;

  @ValidateIf((o) => typeof o.workPermit !== "undefined")
  @Length(12, 12)
  @Column({name: "work_permit", nullable: true})
  public workPermit: string;

  @Column({type: "date", name: "work_permit_expire_date", nullable: true})
  public workPermitExpireDate: Date;

  @Column({name: "is_union_job_override_allowed", nullable: false})
  public isUnionJobOverrideAllowed: boolean = false;

  @Column({name: "is_work_comp_job_override_allowed", nullable: false})
  public isWorkerCompJobOverrideAllowed: boolean = false;

  @Column({name: "is_general_liability_job_override_allowed", nullable: false})
  public isGeneralLiabilityJobOverrideAllowed: boolean = false;

  @Column({type: "date", name: "last_check_date", nullable: true}) // system field
  public lastCheckDate: Date;

  @Column({name: "department", nullable: true}) // TODO: should be relation to other table and create on-the-fly
  public department: string;

  @Column({name: "default_cost", nullable: true}) // TODO: should be relation to other table
  public defaultCost: string;

  @Column({name: "default_phase", nullable: true}) // TODO: should be relation to other table
  public defaultPhase: string;

  @Column({name: "default_job", nullable: true}) // TODO: should be relation to other table
  public defaultJob: string;

  @Column({name: "union_code", nullable: true}) // TODO: should be relation to other table
  public unionCode: string;

  @Column({name: "general_liability_code", nullable: true}) // TODO: should be relation to other table
  public generalLiabilityCode: string;

  @IsNotEmpty()
  @Column({name: "worker_comp_code", nullable: false}) // TODO: should be relation to other table
  public workerCompCode: string;

  @ValidateIf((o) => typeof o.unionCode !== "undefined")
  @IsNotEmpty()
  @Column({name: "craft_code", nullable: false}) // TODO: should be relation to other table
  public craftCode: string;

  @IsNotEmpty()
  @ManyToOne(() => Accounts)
  public account: Accounts;

  @ManyToOne(() => Accounts)
  public subAccount: Accounts;

  // TODO: Will be used when we add Auth middleware to fetch Current User + Current Company from the request
  // @IsNotEmpty()
  // @ManyToOne(() => Companies)
  // public company: Companies;

  constructor(data: any = {}) {
    super();

    this.set(data);
  }

  public set(data: any = {}) {
    this.code = data.code;
    this.status = data.status;
    this.name = data.name;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.ssn = data.ssn;
    this.minority = data.minority;
    this.gender = data.gender;
    this.hasPensionPlan = data.hasPensionPlan;
    this.birthday = data.birthday;
    this.hireDate = data.hireDate;
    this.terminationDate = data.terminationDate;
    this.rehireDate = data.rehireDate;
    this.otherDate = data.otherDate;
    this.stateWithholdingCode = data.stateWithholdingCode;
    this.paymentFrequency = data.paymentFrequency;
    this.isExcludedCertifiedPayroll = data.isExcludedCertifiedPayroll;
    this.federalWithholdingAllowances = data.federalWithholdingAllowances;
    this.federalWithholdingTaxAdjustment = data.federalWithholdingTaxAdjustment;
    this.federalWithholdingTaxAmount = data.federalWithholdingTaxAmount;
    this.salaryAmount = data.salaryAmount;
    this.printDetailsCheckStub = data.printDetailsCheckStub;
    this.driverLicense = data.driverLicense;
    this.workPermit = data.workPermit;
    this.workPermitExpireDate = data.workPermitExpireDate;
    this.isUnionJobOverrideAllowed = data.isUnionJobOverrideAllowed;
    this.isWorkerCompJobOverrideAllowed = data.isWorkerCompJobOverrideAllowed;
    this.isGeneralLiabilityJobOverrideAllowed = data.isGeneralLiabilityJobOverrideAllowed;
    this.lastCheckDate = data.lastCheckDate;
    this.stateSUIorSDICode = data.stateSUIorSDICode;
    this.department = data.department;
    this.defaultCost = data.defaultCost;
    this.defaultPhase = data.defaultPhase;
    this.defaultJob = data.defaultJob;
    this.unionCode = data.unionCode;
    this.generalLiabilityCode = data.generalLiabilityCode;
    this.workerCompCode = data.workerCompCode;
    this.account = data.account;
    this.subAccount = data.subAccount;
    this.localTaxesCode = data.localTaxesCode;
    this.federalStatus = data.federalStatus;
  }
}
