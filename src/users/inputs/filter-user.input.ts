import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterUserInput {
  @Field({nullable: true})
  login: string;
}
