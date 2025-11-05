import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private authenticationClient: ClientProxy,
  ) {}

  async register(user: { username: string; password: string }) {
    try {
      return await lastValueFrom(this.authenticationClient.send('auth.register', user));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
