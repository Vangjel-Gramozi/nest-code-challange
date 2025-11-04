import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  getHello(): string {
    return 'Hello World from the Authentication ms!!!';
  }
}
