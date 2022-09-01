import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field()
    login: string

    @Field()
    password: string
}