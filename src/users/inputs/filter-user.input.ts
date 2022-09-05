import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class FilterUserInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  login: string;

  @Field({ nullable: true })
  isOnline: boolean;
}
