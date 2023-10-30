import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import {
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { TodoFilterQueries } from './common';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const user = await this.userRepository.findOneBy({
      id: +createTodoDto.assigned_to,
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const todo = new TodoEntity();
    Object.assign(todo, createTodoDto);
    todo.assigned_to = user;
    todo.due_date = new Date(createTodoDto.due_date);
    return this.todoRepository.save(todo);
  }

  async findAll(filters: TodoFilterQueries) {
    const findOptionsWhere: FindOptionsWhere<TodoEntity> = {};

    const userIds = filters.assigned_to?.split(',') || [];
    if (filters.assigned_to) {
      findOptionsWhere.assigned_to = In(userIds);
    }

    if (filters.isCompleted !== undefined) {
      findOptionsWhere.is_completed = filters.isCompleted;
    }

    if (filters.dueDateFrom) {
      const findLTE = MoreThanOrEqual(new Date(filters.dueDateFrom));

      findOptionsWhere.due_date =
        typeof findOptionsWhere.due_date === 'undefined'
          ? findLTE
          : Object.assign(findOptionsWhere.due_date, findLTE);
    }

    if (filters.dueDateTo) {
      const findGTE = LessThanOrEqual(new Date(filters.dueDateTo));

      findOptionsWhere.due_date =
        typeof findOptionsWhere.due_date === 'undefined'
          ? findGTE
          : Object.assign(findOptionsWhere.due_date, findGTE);
    }

    const res = await this.todoRepository.find({
      relations: { assigned_to: true },
      where: findOptionsWhere,
      order: {
        is_completed: 'ASC',
      },
    });
    return res;
  }

  findOne(id: number) {
    return this.todoRepository.findOne({
      relations: { assigned_to: true },
      where: { id },
    });
  }

  findOneById(userId: number) {
    return '';
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const candidate = await this.todoRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException(`Todo with id ${id} is not exists`);
    }
    const todo = Object.assign(candidate, updateTodoDto);
    if (updateTodoDto.due_date) {
      todo.due_date = new Date(updateTodoDto.due_date);
    }
    await this.todoRepository.save(todo);
    return todo;
  }

  async remove(id: number) {
    const candidate = await this.todoRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException(`Todo with id ${id} is not exists`);
    }
    return await this.todoRepository.remove(candidate);
  }
}
