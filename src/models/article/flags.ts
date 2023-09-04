import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinTable} from 'typeorm';
import {Content} from './content';
import {User} from '../user';

@Entity()
export class Flags {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => User, user => user.flags)
    @JoinTable()
    user!: User

    @Column({type: "text"})
    reason!: string

    @Column({type: "date"})
    date!: Date

    @ManyToOne(() => Content, content => content.flags)
    content!: Content
}
