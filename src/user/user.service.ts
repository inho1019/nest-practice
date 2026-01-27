import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserList(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmailOrSave(
    email: string,
    username: string,
    providerId: string,
  ): Promise<User> {
    const foundUser = await this.getUser(email);
    if (foundUser) {
      return foundUser;
    }
    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });
    return newUser;
  }

  async updateUser(email: string, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(email);
    user.username = userData.username;
    user.password = userData.password;
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(email: string): Promise<void> {
    await this.userRepository.delete({ email });
  }
}
