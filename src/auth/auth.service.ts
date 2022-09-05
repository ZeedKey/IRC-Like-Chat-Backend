import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    if (!user.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with the specified login doesn`t exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userInput.password === user[0].password) {
      return await this.getToken({ ...user[0] });
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The specified password is incorrect',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(userInput: CreateUserInput) {
    const user = await this.usersService.getUsers({
      id: undefined,
      login: userInput.login,
      isOnline: undefined,
    });

    if (user.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with the specified login already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await this.usersService.createUser({
      ...userInput,
    });

    return this.getToken({ ...createdUser });
  }

  async getToken(userInput: UserEntity) {
    return this.jwtService.sign({ ...userInput });
  }
}
