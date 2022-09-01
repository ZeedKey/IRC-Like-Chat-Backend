import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageInput } from './inputs/create-message.input';
import { FilterMessageInput } from './inputs/filter-message.input';
import { MessagesService } from './messages.service';

@Resolver('Message')
export class MessagesResolver {
  constructor(private readonly messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageEntity)
  async createMessage(
    @Args('message') createMessageInput: CreateMessageInput,
  ): Promise<MessageEntity> {
    return await this.messageService.createMessage(createMessageInput);
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
}
