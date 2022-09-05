import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { FilterUserInput } from './inputs/filter-user.input';
import { SetOnlineInput } from './inputs/set-online.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(filterInput: FilterUserInput): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { login: Like(`%${filterInput.login}%`) },
    });
  }

  async createUser(registerInput: CreateUserInput): Promise<UserEntity> {
    return await this.userRepository.save({ ...registerInput });
  }

  async setUserOnline(userInput: SetOnlineInput): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userInput.id });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with the specified id doesn`t exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userRepository.save({
      ...user,
      isOnline: userInput.isOnline,
    });
  }
}
