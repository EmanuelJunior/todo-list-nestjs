import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  todo: string;

  @Column('enum', { default: 'active', enum: ['complete', 'active'] })
  status: 'complete' | 'active';
}
