import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SetUserOnlineInput {
  @Field()
  id: number;

  @Field()
  isOnline: boolean;
}
