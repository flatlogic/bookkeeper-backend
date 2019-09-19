import { Column } from "typeorm";

export default class BaseAddress {
  @Column()
  public city: string;

  @Column({name: "zip_code", nullable: true})
  public zipCode: string;

  @Column({name: "zip_code_ext", nullable: true})
  public zipCodeExt: string;

  @Column({name: "tel_area_code", nullable: true})
  public telAreaCode: number;

  @Column({name: "tel_prefix", nullable: false})
  public telPrefix: number;

  @Column({name: "tel_number", nullable: false})
  public telNumber: number;

  @Column({name: "license_number", nullable: true})
  public licenseNumber: string;

  @Column({name: "fax_area_code", nullable: true})
  public faxAreaCode: number;

  @Column({name: "fax_prefix", nullable: true})
  public faxPrefix: number;

  @Column({name: "fax_number", nullable: true})
  public faxNumber: string;
}
