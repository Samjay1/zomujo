import { Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';


export class BaseModel {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn()
    auditCreatedAt!: Date;

    @UpdateDateColumn()
    auditUpdatedAt!: Date;

    @Column({type: "text", nullable: true})
    auditCreatedBy!: string;

    @Column({type: "text", nullable: true})
    auditUpdatedBy!: string;

    @Column({type: "text", nullable: true})
    auditStatus!: string;

}