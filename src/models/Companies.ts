import { Length, ValidateIf } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["code"])
export default class Companies {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: false})
  public code: string;

  @Column({default: 1})
  public status: number = 1;

  @Column()
  public name: string;

  @Column({nullable: true})
  public address1: string;

  @Column({nullable: true})
  public address2: string;

  @Column({nullable: true})
  public city: string;

  @Length(2, 2)
  @Column({nullable: true})
  public state: string;

  @Column({nullable: true})
  public country: string;

  @Length(5, 5)
  @Column({name: "zip_code", nullable: true})
  public zipCode: string;

  @Length(4, 4)
  @Column({name: "zip_code_ext", nullable: true})
  public zipCodeExt: string;

  @ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber)
  @Length(3, 3)
  @Column({name: "tel_area_code", nullable: true})
  public telAreaCode: number;

  @ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber)
  @Length(3, 3)
  @Column({name: "tel_prefix", nullable: true})
  public telPrefix: number;

  @ValidateIf((o) => o.telAreaCode || o.telPrefix || o.telNumber)
  @Length(4, 4)
  @Column({name: "tel_number", nullable: true})
  public telNumber: number;

  @Column({name: "license_number", nullable: true})
  public licenseNumber: string;

  @ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber)
  @Length(3, 3)
  @Column({name: "fax_area_code", nullable: true})
  public faxAreaCode: number;

  @ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber)
  @Length(3, 3)
  @Column({name: "fax_prefix", nullable: true})
  public faxPrefix: number;

  @ValidateIf((o) => o.faxAreaCode || o.faxPrefix || o.faxNumber)
  @Length(4, 4)
  @Column({name: "fax_number", nullable: true})
  public faxNumber: string;

  @Length(2, 2)
  @Column({name: "default_withholding_state_code", nullable: true})
  public defaultWithholdingStateCode: string;

  @Column({name: "default_withholding_local1_code", nullable: true})
  public defaultWithholdingLocal1Code: string;

  @Column({name: "default_withholding_local2_code", nullable: true})
  public defaultWithholdingLocal2Code: string;

  @Column({name: "is_multiple_local_taxation", nullable: false, default: false})
  public isMultipleLocalTaxation: boolean = false;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    const {
      code, status, name, address1, address2, city, state, country, zipCode, zipCodeExt,
      telAreaCode, telPrefix, telNumber, licenseNumber, faxAreaCode, faxPrefix, faxNumber,
      defaultWithholdingStateCode, defaultWithholdingLocal1Code, defaultWithholdingLocal2Code, isMultipleLocalTaxation,
    } = data;

    this.code = code;
    this.status = status;
    this.name = name;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
    this.zipCodeExt = zipCodeExt;
    this.telAreaCode = telAreaCode;
    this.telPrefix = telPrefix;
    this.telNumber = telNumber;
    this.licenseNumber = licenseNumber;
    this.faxAreaCode = faxAreaCode;
    this.faxPrefix = faxPrefix;
    this.faxNumber = faxNumber;
    this.defaultWithholdingStateCode = defaultWithholdingStateCode;
    this.defaultWithholdingLocal1Code = defaultWithholdingLocal1Code;
    this.defaultWithholdingLocal2Code = defaultWithholdingLocal2Code;
    this.isMultipleLocalTaxation = isMultipleLocalTaxation;
  }
}
