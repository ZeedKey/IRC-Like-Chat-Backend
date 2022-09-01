import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../users/inputs/create-user.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async login(@Args('user') userInput: CreateUserInput) {
    return await this.authService.login({ ...userInput });
  }

  @Mutation(() => String)
  async register(@Args('user') userInput: CreateUserInput) {
    return await this.authService.register({ ...userInput });
  }
}
