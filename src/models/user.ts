import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Appointment} from "./appointment";
import {Subscription} from "./subscription";
import {Payment} from "./payment";
import {Flags} from './article/flags';
import {Likes} from './article/likes';
import {Content} from './article/content';
import {Comments} from './article/comments';
import {TestResult} from './testResults';
import { JournalEntry } from "./smartJournal";

@Entity()
export class User {
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

    @Column({type: "text"})
    password!: string

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments?: Appointment[]

    @OneToMany(() => Subscription, subscription => subscription.user)
    subscriptions?: Subscription[]

    @OneToMany(() => Payment, payment => payment.user)
    payments?: Payment[]

    @OneToMany(() => Flags, flags => flags.user)
    flags?: Flags[]

    @OneToMany(() => Likes, likes => likes.user)
    likes?: Likes[]

    @OneToMany(() => Content, content => content.author)
    content?: Content[]

    @OneToMany(() => Comments, comments => comments.user)
    comments!: Comments[]

    @OneToMany(() => TestResult, result => result.user)
    results?: TestResult[]

    @OneToMany(() => JournalEntry, journalEntry => journalEntry.user)
    journalEntries?: JournalEntry[]
}
