import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserEntity } from '../../src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, UserEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
