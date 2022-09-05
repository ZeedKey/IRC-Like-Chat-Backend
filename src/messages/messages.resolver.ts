import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageInput } from './inputs/create-message.input';
import { FilterMessageInput } from './inputs/filter-message.input';
import { MessagesService } from './messages.service';

@Resolver('Message')
export class MessagesResolver {
  private pubsub: PubSub;
  constructor(private readonly messageService: MessagesService) {
    this.pubsub = new PubSub();
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageEntity)
  async createMessage(
    @Args('message') messageInput: CreateMessageInput,
  ): Promise<MessageEntity> {
    const createdMessage = await this.messageService.createMessage(
      messageInput,
    );
    this.pubsub.publish('onMessageReceived', {
      onMessageReceived: { ...createdMessage },
    });
    return createdMessage;
  }

  @Query(() => [MessageEntity])
  async getMessages(
    @Args('filter') filterMessageInput: FilterMessageInput,
    @Args('page') page: number,
  ): Promise<MessageEntity[]> {
    return await this.messageService.getMessages(
      { ...filterMessageInput },
      page,
    );
  }

  @Subscription(() => MessageEntity)
  onMessageReceived() {
    return this.pubsub.asyncIterator('onMessageReceived');
  }
}
