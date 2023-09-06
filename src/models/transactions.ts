import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('transaction') 
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  reference!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column()
  status!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
