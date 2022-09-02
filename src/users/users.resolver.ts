import { Args, Mutation, Subscription } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserEntity } from './entities/user.entity';
import { SetUserOnlineInput } from './inputs/set-user-online.input';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  private pubSub: PubSub;
  constructor(private readonly usersService: UsersService) {
    this.pubSub = new PubSub();
  }

  @Mutation(() => UserEntity)
  async setUserOnline(@Args('isOnlineInput') payloadInput: SetUserOnlineInput) {
    const user = await this.usersService.setUserOnline({ ...payloadInput });
    this.pubSub.publish('statusChanged', { ...payloadInput });
    return user;
  }

  @Subscription(() => UserEntity, {
    filter: (payload, variables) => payload.id === variables.id,
  })
  async statusChanged(@Args('payload') payload: SetUserOnlineInput) {
    console.log('here!');
  }
}
