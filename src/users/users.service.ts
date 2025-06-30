import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/schemas/users';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>) {
    console.log('userService run');
  }
  async getAllUsers(): Promise<Users[]> {
    return this.userModel.find();
  }

  async getUserById(id): Promise<Users | null> {
    return this.userModel.findById(id);
  }

  async getUserByEmail(email: string): Promise<UsersDocument | null> {
    return this.userModel.findOne({ email });
  }

  async sendUser(data): Promise<UsersDocument> {
    const userData = new this.userModel(data);
    return userData.save();
  }

  async updateUser(id: string, updateData: Partial<Users>): Promise<Users | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUsers(): Promise<any> {
    return this.userModel.deleteMany();
  }

  async deleteUserById(id: string): Promise<Users | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
