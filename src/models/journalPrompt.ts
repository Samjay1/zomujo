import { Entity, Column } from 'typeorm';
import { BaseModel } from '../utils/BaseModel';
@Entity()
export class JournalPrompt extends BaseModel {
    @Column({type: "text"})
    prompt!: string;

}