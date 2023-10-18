import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

@Schema()
export class ProductOrder {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  product: Product;

  @Prop({ default: 1 })
  quantity: number;
}
const ProductOrderSchema = SchemaFactory.createForClass(ProductOrder);

@Schema()
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  owner: User;

  @Prop({ default: 0 })
  totalPrice: number;

  @Prop({
    type: [ProductOrderSchema],
    default: [],
  })
  products: ProductOrder[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre('save', async function (next: any) {
  const order = this as Order;
  let totalPrice = 0;
  order.products.forEach((product) => {
    totalPrice += product.quantity * product.product.price;
  });
  order.totalPrice = totalPrice;
  next();
});
