import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AuthGuard } from './guard/auth-guard.guard';
import { NetworkingModule } from '../../../../core/networking/networking.module';
import { AuthJwtModule } from 'common/auth/jwt.module';

@Module({
  imports: [NetworkingModule, AuthJwtModule],
  providers: [AuthenticationService, AuthGuard],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
