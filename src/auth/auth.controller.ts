import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { userLoginDto, userRegistDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/shared/user/user.service';
import { AuthService } from './auth.service';
import { SellerGuard } from 'src/guards/seller.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('login')
  async login(@Body() userDto: userLoginDto) {
    const user = await this.userService.findByLogin(userDto);
    const payload = {
      username: user.name,
      seller: user.seller,
    };
    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('register')
  async register(@Body() userDto: userRegistDto) {
    const user = await this.userService.create(userDto);
    const payload = {
      username: user.name,
      seller: user.seller,
    };
    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('logout')
  async logout() {}
}
