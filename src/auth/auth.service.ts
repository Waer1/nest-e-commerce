import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/shared/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }

  async signPayload(payload: any) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '14d' });
  }
}
