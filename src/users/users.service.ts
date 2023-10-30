import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  createUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const candidate = await this.userRepository.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException(`Todo with id ${id} is not exists`);
    }
    const user = Object.assign(candidate, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }
}
