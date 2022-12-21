import { hashSync, getRounds } from 'bcryptjs'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50 })
  name: string

  @Column({ length: 50, unique: true })
  email: string

  @Column({ length: 120 })
  password: string

  @Column()
  isAdm: boolean

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // @OneToOne(() => Address)
  // @JoinColumn()
  // address: Address

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const isEncrypted = getRounds(this.password)
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10)
    }
  }
}
export default User
