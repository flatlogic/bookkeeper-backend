@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column({ nullable: true }) name: string
  @Column({ type: 'varchar', length: 100, nullable: false }) password: string
  @OneToMany((type) => Pet, (pet) => pet.user) pets: Pet[]

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }
}