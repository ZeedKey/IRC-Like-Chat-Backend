import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageInput } from './inputs/create-message.input';
import { FilterMessageInput } from './inputs/filter-message.input';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(
    messageInput: CreateMessageInput,
  ): Promise<MessageEntity> {
    return await this.messageRepository.save({ ...messageInput });
  }

  async getMessages(
    filter: FilterMessageInput,
    page: number = 1,
  ): Promise<MessageEntity[]> {
    return await this.messageRepository.find({
      take: 50,
      skip: 50 * (page - 1),
      where: {
        author: Like(`%${filter.author}%`),
        content: Like(`%${filter.content}%`),
      },
    });
  }
}
