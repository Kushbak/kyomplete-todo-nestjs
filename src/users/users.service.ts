import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: CreateUserDto[] = [];

  createUser(user: CreateUserDto) {
    this.users.push(user);
  }

  findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
