import { User } from './user';
import {Entity, Column, ManyToOne} from 'typeorm';
import { BaseModel } from '../utils/BaseModel';
@Entity()
export class JournalEntry extends BaseModel {
    @Column({type: "text"})
    userId!: string;

    @Column({type: "text"})
    entry!: string;

    @Column({type: "text"})
    prompt!: string;

    @ManyToOne(() => User, user => user.journalEntries)
    user!: User;
}