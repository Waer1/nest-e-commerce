import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, UpdateProductDto } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/guards/seller.guard';
import { User } from 'src/utils/user.decorator';
import { User as userType } from 'src/schemas/user.schema';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll() {
    return await this.productService.getAllProducts();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async AddProduct(@Body() productDto: ProductDto, @User() user: userType) {
    return await this.productService.addProduct(productDto, user);
  }

  @Get('mine')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async listMine(@User() user: userType) {
    return await this.productService.getAllProductsBySeller(user._id);
  }

  @Get('seller/:id')
  async listBySeller(@Param('id') id: string) {
    return await this.productService.getAllProductsBySeller(id);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProduct(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
    @User() user: userType,
  ) {
    return await this.productService.updateProduct(id, productDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async deleteProduct(@Param('id') id: string, @User() user: userType) {
    return await this.productService.deleteProduct(id, user);
  }
}
