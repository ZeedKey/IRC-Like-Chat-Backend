import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-core';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserInput } from '../users/inputs/create-user.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userInput: CreateUserInput) {
    const user = await this.usersService.getUsers({
      id: undefined,
      login: userInput.login,
      isOnline: undefined,
    });

    if (!user.length)
      throw new ApolloError(
        'User with the specified login doesn`t exist',
        'BAD_USER_INPUT',
      );

    if (userInput.password === user[0].password) {
      return await this.getToken({ ...user[0] });
    } else {
      throw new ApolloError(
        'The specified password is incorrect',
        'BAD_USER_INPUT',
      );
    }
  }

  async register(userInput: CreateUserInput) {
    const user = await this.usersService.getUsers({
      id: undefined,
      login: userInput.login,
      isOnline: undefined,
    });

    if (user.length)
      throw new ApolloError(
        'User with the specified login already exists',
        'BAD_USER_INPUT',
      );

    const createdUser = await this.usersService.createUser({
      ...userInput,
    });

    return this.getToken({ ...createdUser });
  }

  async getToken(userInput: UserEntity) {
    return this.jwtService.sign({ ...userInput });
  }
}
