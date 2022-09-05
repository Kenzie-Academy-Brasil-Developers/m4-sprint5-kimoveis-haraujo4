import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./address.entity";
import { Category } from "./category.entity";
import { Schedule } from "./schedule.entity";

@Entity('properties')
export class Property {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'boolean', default: false })
    sold: boolean

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    value: number

    @Column({ type: 'integer' })
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Schedule, (schedule) => schedule.property)
    schedules: Schedule[]

    @ManyToOne(() => Category, { eager: true })
    category: Category

    @OneToOne(() => Address, { eager: true})
    @JoinColumn()
    address: Address
}