import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from '../../../../common/dtos/register-user.dto';
import { UserRto } from '../../../../common/rto/user.rto';
import { LoginDto } from '../../../../common/dtos/login.dto';
import { AuthResultRto } from '../../../../common/rto/auth.rto';
import { AuthGuard } from './guard/auth-guard.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  register(@Body() body: RegisterUserDto): Promise<UserRto> {
    return this.authenticationService.register(body);
  }

  @Get('users')
  listUsers(): Promise<UserRto[]> {
    return this.authenticationService.listUsers();
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<AuthResultRto> {
    return this.authenticationService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
