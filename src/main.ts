import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);

  const ports = {
    default: config.get('API_PORT'),
    alternative: config.get('API_PORT_ALTERNATIVE'),
  };

  await app.listen(3000, () =>
    console.log('App has successfuly started!'),
  );
}
bootstrap();
