import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {User} from '../user';
import {Content} from './content';

@Entity()
export class Likes {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "date"})
    date!: Date

    @ManyToOne(() => User, user => user.likes)
    user!: User

    @ManyToOne(() => Content, content => content.likes)
    content!: Content
}
