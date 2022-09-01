import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  author: string;

  @Field()
  content: string;
}