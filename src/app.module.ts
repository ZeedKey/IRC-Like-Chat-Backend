import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { WebsocketsGateway } from './gateway/websockets.gateway';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        //TODO: ENV
        type: 'postgres',
        username: 'postgres',
        password: '1234',
        database: 'postgres',
        port: 5432,
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        //TODO: MIGRATIONS
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      sortSchema: true,
    }),
    AuthModule,
    UsersModule,
    MessagesModule,
  ],
  providers: [WebsocketsGateway],
})
export class AppModule {}
