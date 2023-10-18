import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  image: string;

  @IsNotEmpty()
  @IsInt()
  price: number;
}

export type UpdateProductDto = Partial<ProductDto>;
