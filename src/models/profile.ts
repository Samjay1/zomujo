/*
* A Therapist's user profile stating relevant information
* */
import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Therapist} from "./therapist";

@Entity()
export  class Profile {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text", nullable: true})
    qualifications?: string

    @Column({type: "text", nullable: true})
    specializations?: string

    @Column({type: "text"})
    additionalInformation?: string

    @Column({type: "text", nullable: true})
    bio?: string

    // every therapist has a profile
    @OneToOne(() => Therapist, therapist => therapist.profile)
    therapist!: Therapist
}