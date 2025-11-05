import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NetworkingService {
  constructor(
    @Inject('AUTHENTICATION_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  async send<TResponse, TPayload>(pattern: string, payload: TPayload): Promise<TResponse> {
    return await lastValueFrom(this.authClient.send<TResponse, TPayload>(pattern, payload));
  }
}


