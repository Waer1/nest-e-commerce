import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserDecorator } from 'src/utils/user.decorator';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto } from './order.dto';

@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async listAll() {
    return await this.orderService.listAll();
  }

  @Get('mine')
  async listMine(@UserDecorator() user: User) {
    return await this.orderService.listOrderForUser(user._id);
  }

  @Post()
  async AddOrder(@Body() products: OrderDto, @UserDecorator() user: User) {
    return await this.orderService.addOrder(user , products);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrder(id);
  }

  @Post(':id')
  async updateOrder(@Param('id') id: string, @Body() updatedOrder: OrderDto) {
    return await this.orderService.updateOrder(id, updatedOrder);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id); 
  }
}
