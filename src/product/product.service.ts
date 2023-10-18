import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { ProductDto, UpdateProductDto } from './product.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find({});
  }

  async getAllProductsBySeller(sellerId: string): Promise<Product[]> {
    return await this.productModel.find({ owner: sellerId }).populate('owner');
  }

  async addProduct(productDto: ProductDto, user: User): Promise<Product> {
    console.log(user);
    const product = await this.productModel.create({
      owner: user,
      createdAt: new Date(),
      ...productDto,
    });
    return product;
  }

  async getProduct(productId: string): Promise<Product> {
    return await this.productModel.findById(productId);
  }

  async updateProduct(
    productId: string,
    edits: UpdateProductDto,
    user: User,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productId,
      { ...edits, updatedAt: new Date() },
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    if (updatedProduct.owner._id !== user._id) {
      throw new NotFoundException(
        `Product with ID ${productId} not found for this user.`,
      );
    }

    return updatedProduct;
  }

  async deleteProduct(productId: string, user: User): Promise<Product> {
    const deletedProduct = await this.productModel.findById(productId);

    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    if (deletedProduct.owner._id !== user._id) {
      throw new NotFoundException(
        `Product with ID ${productId} not found for this user.`,
      );
    }

    return deletedProduct;
  }
}
