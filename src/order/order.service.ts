import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { User } from 'src/schemas/user.schema';
import { OrderDto } from './order.dto';
import { Product } from '../schemas/product.schema';
import { OrderModule } from './order.module';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async listAll() {
    return await this.orderModel.find();
  }

  async listOrderForUser(userId: string) {
    return await this.orderModel.find({ owner: userId });
  }

  async addOrder(user: User, orderDto: OrderDto) {
    const newOrder = {
      owner: user._id,
      createdAt: new Date(),
      products: orderDto.products,
    };

    const new_order = await this.orderModel.create(newOrder);

    return new_order;
  }

  async getOrder(id: string) {
    return await this.orderModel.findById(id);
  }

  async updateOrder(id: string, updatedOrder: OrderDto) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await order.updateOne(updatedOrder);
    return order;
  }

  async deleteOrder(id: string) {
    const order = this.orderModel.findById(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await order.deleteOne();
    return order;
  }
}
