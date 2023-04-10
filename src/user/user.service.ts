import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    if (!newUser) {
      return new NotFoundException('User already created');
    }
    const d = await this.userRepository.save(newUser);
    console.log('d:', d);
    return await d;
  }

  async findUsersById(id: string) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (user) {
      return new NotFoundException('User not found');
    }
    return user;
  }
}
