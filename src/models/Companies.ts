import { IsOptional, Length, ValidateIf, ValidateNested } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";

import {getRepository} from "../services/db";
import Addresses from "./Addresses";
import Organizations from "./Organizations";
import UserCompanyRoles from "./UserCompanyRoles";
import Users from "./Users";

@Entity()
@Unique(["code"])
export default class Companies {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({name: "is_deleted", default: false})
  public isDeleted: boolean = false;

  @Column({nullable: false})
  public code: string;

  @Column({default: 1})
  public status: number = 1;

  @Column()
  public name: string;

  @Column({nullable: true})
  public country: string;

  // @Column({nullable: true})
  // public address1: string;
  //
  // @Column({nullable: true})
  // public address2: string;
  //
  // @Column({nullable: true})
  // public city: string;
  //
  // @Length(2, 2)
  // @Column({nullable: true})
  // public state: string;
  //
  // @Length(5, 5)
  // @Column({name: "zip_code", nullable: true})
  // public zipCode: string;
  //
  // @Length(4, 4)
  // @Column({name: "zip_code_ext", nullable: true})
  // public zipCodeExt: string;
  //
  // @ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber)
  // @Length(3, 3)
  // @Column({name: "tel_area_code", nullable: true})
  // public telAreaCode: number;
  //
  // @ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber)
  // @Length(3, 3)
  // @Column({name: "tel_prefix", nullable: true})
  // public telPrefix: number;
  //
  // @ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber)
  // @Length(4, 4)
  // @Column({name: "tel_number", nullable: true})
  // public telNumber: number;

  // @ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber)
  // @Length(3, 3)
  // @Column({name: "fax_area_code", nullable: true})
  // public faxAreaCode: number;
  //
  // @ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber)
  // @Length(3, 3)
  // @Column({name: "fax_prefix", nullable: true})
  // public faxPrefix: number;
  //
  // @ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber)
  // @Length(4, 4)
  // @Column({name: "fax_number", nullable: true})
  // public faxNumber: string;

  @Column({name: "license_number", nullable: true})
  public licenseNumber: string;

  @Length(2, 2)
  @Column({name: "default_withholding_state_code", nullable: true})
  public defaultWithholdingStateCode: string;

  @Column({name: "default_withholding_local1_code", nullable: true})
  public defaultWithholdingLocal1Code: string;

  @Column({name: "default_withholding_local2_code", nullable: true})
  public defaultWithholdingLocal2Code: string;

  @Column({name: "is_multiple_local_taxation", nullable: false, default: false})
  public isMultipleLocalTaxation: boolean = false;

  @ManyToMany(() => Users, (user) => user.companies)
  public users: Users[];

  @ManyToOne(() => Organizations, (organization) => organization.companies)
  @JoinColumn({ name: "organizationId" })
  public organization: Organizations;

  @Column({ nullable: true })
  public organizationId: number;

  @OneToMany(() => UserCompanyRoles, (companyRole) => companyRole.company, {cascade: true})
  public roles: UserCompanyRoles[];

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

  constructor(data: any) {
    this.set(data);
  }

  public async set(data: any = {}) {
    this.code = data.code;
    this.status = data.status;
    this.name = data.name;
    this.country = data.country;
    // this.address1 = address1;
    // this.address2 = address2;
    // this.city = city;
    // this.state = state;
    // this.zipCode = zipCode;
    // this.zipCodeExt = zipCodeExt;
    // this.telAreaCode = telAreaCode;
    // this.telPrefix = telPrefix;
    // this.telNumber = telNumber;
    // this.faxAreaCode = faxAreaCode;
    // this.faxPrefix = faxPrefix;
    // this.faxNumber = faxNumber;
    this.licenseNumber = data.licenseNumber;
    this.defaultWithholdingStateCode = data.defaultWithholdingStateCode;
    this.defaultWithholdingLocal1Code = data.defaultWithholdingLocal1Code;
    this.defaultWithholdingLocal2Code = data.defaultWithholdingLocal2Code;
    this.isMultipleLocalTaxation = data.isMultipleLocalTaxation;

    this.setAddresses(data);
    if (data.organization) {
      await this.setOrganization(data.organization);
    }
  }

  public async setOrganization(id: string|number) {
    const repository = await getRepository(Organizations);
    const result = await repository.findOne(id);
    if (result) {
      this.organization = result;
    }
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
