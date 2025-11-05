import { Injectable } from '@nestjs/common';
import { UserService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const user = await this.userService.create(username, password);
    return { id: user._id.toString(), username: user.username };
  }

  async listUsers() {
    return this.userService.findAll();
  }

  async login(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new RpcException({ message: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new RpcException({ message: 'Invalid credentials' });
    }
    const payload = { sub: user._id.toString(), username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, userId: payload.sub, username: payload.username };
  }
}
