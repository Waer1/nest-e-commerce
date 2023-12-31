import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { AuthService } from './auth.service';
import { JwtStaratgyService } from './jwt.staratgy.service';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStaratgyService],
})
export class AuthModule {}
