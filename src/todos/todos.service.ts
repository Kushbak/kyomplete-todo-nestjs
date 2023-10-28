import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto);
  }

  findAll() {
    return this.todoRepository.find();
  }

  findOne(id: number) {
    return this.todoRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const candidate = await this.todoRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException(`Todo with id ${id} is not exists`);
    }
    const todo = Object.assign(candidate, updateTodoDto);
    await this.todoRepository.save(todo);
    return todo;
  }

  async remove(id: number) {
    const candidate = await this.todoRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException(`Todo with id ${id} is not exists`);
    }
    await this.todoRepository.remove(candidate);
  }
}
