import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtStaratgyService extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.auth.validateUser(payload);
    if (!user) {
      return done(
        new HttpException('unotherized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }
    done(null, user, payload.iat);
  }
}
