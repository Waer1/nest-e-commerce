import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Address } from 'src/schemas/user.schema';

export class userLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class userRegistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsBoolean()
  @IsOptional()
  seller?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address;
}
