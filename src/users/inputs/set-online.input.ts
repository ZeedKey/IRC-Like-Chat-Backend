import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SetOnlineInput {
  @Field()
  id: number;

  @Field()
  isOnline: boolean;
}
