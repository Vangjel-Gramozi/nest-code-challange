import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';
import { AUTH_LIST_USERS, AUTH_LOGIN, AUTH_REGISTER } from '../../../common/contracts/auth.patterns';
import { RegisterUserDto } from 'common/dtos/register-user.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern(AUTH_REGISTER)
  async register(@Payload() input: RegisterUserDto) {
    return await this.authenticationService.register(
      input.username,
      input.password,
    );
  }

  @MessagePattern(AUTH_LIST_USERS)
  async listUsers() {
    return await this.authenticationService.listUsers();
  }

  @MessagePattern(AUTH_LOGIN)
  async login(@Payload() input: RegisterUserDto) {
    return await this.authenticationService.login(
      input.username,
      input.password,
    );
  }
}
