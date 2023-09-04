import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, ManyToMany} from 'typeorm';
import {Content} from './content';

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text"})
    name!: string

    @ManyToMany(() => Content, content => content.category)
    content!: Content[]
}
