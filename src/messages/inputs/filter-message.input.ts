import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class FilterMessageInput {
  @Field({nullable: true})
  author: string;

  @Field({nullable: true})
  content: string;
}
