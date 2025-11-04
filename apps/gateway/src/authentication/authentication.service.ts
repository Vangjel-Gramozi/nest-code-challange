import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private authenticationClient: ClientProxy,
  ) {}

  getHello() {
    return this.authenticationClient.send('get_hello', {});
  }
}
