import { ApiProperty } from '@nestjs/swagger';

export class AuthResultRto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;
}


