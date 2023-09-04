/*
* Therapist DB model
* */

// TODO: therapist profile metadata
/*  specializations, qualifications, availability
*   suggested: separate models with relational links if discrete
*   to be provided by therapist
*/

import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Appointment} from "./appointment";
import {Profile} from "./profile";

@Entity()
export class Therapist {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text"})
    firstName!: string

    @Column({type: "text"})
    lastName!: string

    @Column({type: "text"})
    username!: string

    @Column({type: "text"})
    email!: string

    @Column({type: "date", nullable: true})
    dateOfBirth?: Date

    @Column({type: "text"})
    password!: string

    // every therapist can have a list of appointments
    @OneToMany(() => Appointment, appointment => appointment.therapist)
    appointments?: Appointment[];

    // every therapist has a profile
    @OneToOne(() => Profile, profile => profile.therapist)
    profile?: Profile
}