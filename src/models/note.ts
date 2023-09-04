import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Appointment} from "./appointment";

@Entity()
export class Note {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text"})
    noteText!: string

    @OneToOne(() => Appointment, appointment => appointment.notes)
    appointment!: Appointment
}