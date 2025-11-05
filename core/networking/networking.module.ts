import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NetworkingService } from './networking.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTHENTICATION_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('TCP_HOST') || 'localhost',
            port: config.get<number>('TCP_PORT') || 4002,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [NetworkingService],
  exports: [NetworkingService],
})
export class NetworkingModule {}


