import { Controller, Get } from '@nestjs/common';
import * as authenticationService from './authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: authenticationService.AuthenticationService,
  ) {}

  @MessagePattern('auth.register')
  async register(@Payload() input: { username: string; password: string }) {
    return await this.authenticationService.authenticate(input);
  }
}
