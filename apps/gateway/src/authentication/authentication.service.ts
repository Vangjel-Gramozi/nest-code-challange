import { BadRequestException, Injectable } from '@nestjs/common';
import { NetworkingService } from '../../../../core/networking/networking.service';
import { RegisterUserDto } from '../../../../common/dtos/register-user.dto';
import { UserRto } from '../../../../common/rto/user.rto';
import { AUTH_LIST_USERS, AUTH_LOGIN, AUTH_REGISTER } from '../../../../common/contracts/auth.patterns';
import { LoginDto } from '../../../../common/dtos/login.dto';
import { AuthResultRto } from '../../../../common/rto/auth.rto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly networking: NetworkingService,
  ) {}

  async register(user: RegisterUserDto): Promise<UserRto> {
    try {
      return await this.networking.send<UserRto, RegisterUserDto>(AUTH_REGISTER, user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async listUsers(): Promise<UserRto[]> {
    try {
      return await this.networking.send<UserRto[], {}>(AUTH_LIST_USERS, {} as any);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(input: LoginDto): Promise<AuthResultRto> {
    try {
      return await this.networking.send<AuthResultRto, LoginDto>(AUTH_LOGIN, input);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
