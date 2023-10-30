import { UserEntity } from '../../../src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;

  @Column({ type: 'json', default: null })
  result: Record<string, any>;

  @Column({ type: 'timestamptz' })
  due_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  assigned_to: UserEntity;
}
