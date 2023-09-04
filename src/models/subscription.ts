/*
* Model for subscription data between Therapists and Users
* */

import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text"})
    subscriptionType!: string

    @Column({type: "decimal", precision: 10, scale: 2})
    price!: number

    @Column({type: "date"})
    startDate!: Date

    @Column({type: "date"})
    endDate!: Date

    @ManyToOne(() => User, user => user.subscriptions)
    user!: User
}