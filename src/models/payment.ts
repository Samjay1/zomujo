/*
* Model for storing payments, executed by Paystack
* */

import {User} from "./user";
import {Appointment} from "./appointment";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export  class Payment {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({type: "decimal", precision: 10, scale: 2})
    amount!: number

    @Column({type: "timestamp"})
    paymentDate!: Date

    @ManyToOne(() => User, user => user.payments)
    user!: User

    @ManyToOne(() => Appointment, appointment => appointment.payments)
    appointment!: Appointment
}