import { Query } from '@nestjs/graphql';
import { Args, Mutation, Subscription } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserEntity } from './entities/user.entity';
import { FilterUserInput } from './inputs/filter-user.input';
import { SetOnlineInput } from './inputs/set-online.input';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  private pubsub: PubSub;
  constructor(private readonly usersService: UsersService) {
    this.pubsub = new PubSub();
  }

  @Query(() => [UserEntity])
  async getUsers(
    @Args('filter') filter: FilterUserInput,
  ): Promise<UserEntity[]> {
    return this.usersService.getUsers({ ...filter });
  }

  @Mutation(() => UserEntity)
  async setUserOnline(@Args('user') user: SetOnlineInput): Promise<UserEntity> {
    const updatedUser = await this.usersService.setUserOnline({ ...user });
    this.pubsub.publish('onUserJoined', { onUserJoined: { ...updatedUser } });
    return updatedUser;
  }

  @Subscription(() => UserEntity)
  onUserJoined() {
    return this.pubsub.asyncIterator('onUserJoined');
  }
}
