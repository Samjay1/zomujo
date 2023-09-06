// src/entities/Meeting.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  meetingId!: string;

  @Column('timestamp')
  startTime!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
