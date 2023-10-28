import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  due_date?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  due_time?: string;
}
