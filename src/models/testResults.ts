/*
* Model for an testResult(holds history of tests taken)
* */
import { User } from "./user";
import { Column,Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum testType {
    SLS='SLS',
    GAD= 'GAD',
    CES='CES',
    BADS='BADS',
    EPDS='EPDS'
}
export interface IResponse{
    question: string, 
    response: number
}
interface IResult{
    number: number,
    interpretation: string
}
@Entity()
export class TestResult{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text"})
    testType!: testType

    @Column({type: "nvarchar"})
    results!: IResult

    @Column({type: "nvarchar"})
    response!: IResponse[]

    @ManyToOne(() => User, user => user.results)
    user!: User
}