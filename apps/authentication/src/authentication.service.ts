import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

export type AuthInput = {
  username: string;
  password: string;
};

export type SignInData = {
  userId: string;
  username: string;
};

export type AuthResult = {
  accessToken: string;
  userId: string;
  username: string;
};

@Injectable()
export class AuthenticationService {
  constructor(
    private userSerice: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult | null> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new RpcException({
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS', 
      });
    }

    // return {
    //   accessToken: 'dummy-token',
    //   userId: user.userId,
    //   username: user.username,
    // };

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userSerice.findOne(input.username);
    if (user && user.password === input.password) {
      return { userId: user.id, username: user.username };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = { sub: user.userId, username: user.username };
    const accessToken = this.jwtService.sign(tokenPayload);

    return {
      accessToken,
      userId: user.userId,
      username: user.username,
    };
  }
}
