import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthenticationModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4002,
    },
  });
  await app.listen();
}
bootstrap();
