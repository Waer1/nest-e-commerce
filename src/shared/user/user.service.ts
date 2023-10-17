import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { userLoginDto, userRegistDto } from '../../auth/auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find();
  }

  async findByLogin(userDTO: userLoginDto) {
    const { email, password } = userDTO;

    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload(payload: any) {
    const { username } = payload;
    const user = await this.userModel.findOne({ name: username });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async create(userDTO: userRegistDto) {
    const { email } = userDTO;

    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userModel.create(userDTO);
    return newUser;
  }
}
