import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get()
  getHello() {
    return this.authenticationService.getHello();
  }
}
