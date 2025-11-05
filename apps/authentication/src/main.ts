import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthenticationModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST || '0.0.0.0',
      port: Number(process.env.TCP_PORT),
    },
  });

  await app.listen();
}
bootstrap();
