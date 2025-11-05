import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOneByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(username: string, password: string): Promise<UserDocument> {
    const existing = await this.findOneByUsername(username);
    if (existing) {
      throw new ConflictException('Username already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    const created = new this.userModel({ username, password: hashed });
    return created.save();
  }

  async findAll(): Promise<Array<{ id: string; username: string }>> {
    const docs = await this.userModel.find({}, { username: 1 }).exec();
    return docs.map((d) => ({ id: d._id.toString(), username: d.username }));
  }
}
