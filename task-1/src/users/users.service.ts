/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create new Entry
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = { ...createUserDto, status: 'active' };
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  // Get All users
  async findAll(): Promise<User[]> {
    return this.userModel.find({status:'active'}).exec();
  }

  // Get Single User By id
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({_id:id, status:'active'}).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Update User
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate({_id:id,status:'active'}, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  // Delete User, i.e., make user status inactive
  async remove(id: string): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({_id:id,status:'active'},{ status: 'inactive' }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
