import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, OneToOne, JoinTable} from 'typeorm';
import {Content} from './content';
import {User} from '../user';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => User, user => user.comments)
    @JoinTable()
    user!: User

    @Column({type: "text"})
    text!: string

    @Column({type: "date"})
    date!: Date

    @ManyToOne(() => Content, content => content.comments)
    content!: Content
}
