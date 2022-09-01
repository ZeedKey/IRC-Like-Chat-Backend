import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { FilterUserInput } from './inputs/filter-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(userInput: FilterUserInput): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { login: userInput.login },
    });
  }

  async createUser(userInput: CreateUserInput): Promise<UserEntity> {
    return await this.userRepository.save({ ...userInput });
  }
}
