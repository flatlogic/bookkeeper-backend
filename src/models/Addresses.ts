import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Addresses {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @Column({nullable: false})
  public street: string;

  @IsNotEmpty()
  @Column({nullable: false})
  public city: string;

  @IsNotEmpty()
  @Column({nullable: false})
  public state: string;

  @IsNotEmpty()
  @Length(5, 5)
  @Column({name: "zip_code", nullable: false})
  public zipCode: string;

  @Column({nullable: true})
  public phone: string;

  constructor(data: any) {
    this.set(data);
  }

  public set(data: any = {}) {
    this.street = data.street;
    this.city = data.city;
    this.state = data.state;
    this.zipCode = data.zipCode;
    this.phone = data.phone;
  }
}
