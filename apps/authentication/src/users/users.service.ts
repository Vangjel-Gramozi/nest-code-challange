import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  username: string;
  password: string;
};

const users: User[] = [
  { id: '1', username: 'john_doe', password: 'password123' },
  { id: '2', username: 'jane_smith', password: 'securepass' },
];
@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
