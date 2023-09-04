/*
* Model for an appointment/session between a Therapist and User
* */

import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Therapist} from "./therapist";
import {User} from "./user";
import {Payment} from "./payment";
import {Note} from "./note";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "timestamp"})
    scheduledTime!: Date

    @Column({type: "int"})
    durationMinutes!: number

    @Column({type: "text"})
    status!: string

    @Column({type: "text", nullable: true})
    additionalInformation?: string

    @ManyToOne(() => Therapist, therapist => therapist.appointments)
    therapist!: Therapist

    @ManyToOne(() => User, user => user.appointments)
    user!: User

    @OneToMany(() => Payment, payment => payment.appointment)
    payments?: Payment[]

    @OneToMany(() => Note, note => note.appointment)
    notes?: Note[]
}