import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '../../../config/config.module';

@Module({
  imports: [ConfigModule, AuthenticationModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
