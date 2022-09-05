import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Schedule } from "./schedule.entity";
import { Exclude } from 'class-transformer'

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "varchar", unique: true })
    email: string

    @Column({ type: "varchar" })
    @Exclude()
    password: string

    @Column({ type: "boolean" })
    isAdm: boolean

    @Column({ type: "boolean", default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Schedule, (schedule) => schedule.user)
    shedules: Schedule[]
    
}