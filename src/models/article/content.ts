import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import {Category} from './categories';
import {Flags} from './flags';
import {Comments} from './comments';
import {Likes} from './likes';
import {User} from '../user';

@Entity()
export class Content {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text"})
    title!: string

    @Column({type: "text"})
    text!: string

    @Column({type: "date"})
    date!: Date

    @ManyToOne(() => User, user => user.content)
    @JoinTable()
    author!: User

    @ManyToMany(() => Category, category => category.content)
    @JoinTable()
    category!: Category[]

    @OneToMany(() => Flags, flags => flags.content)
    @JoinTable()
    flags?: Flags[]

    @OneToMany(() => Comments, comments => comments.content)
    @JoinTable()
    comments?: Comments[]

    @OneToMany(() => Likes, likes => likes.content)
    @JoinTable()
    likes?: Comments[]
}
