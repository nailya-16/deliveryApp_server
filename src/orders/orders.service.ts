import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from 'src/schemas/orders';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private orderModel: Model<Orders>) {}

  async create(orderData: any): Promise<Orders> {
    for (const item of orderData.cart) {
      if (item.quantity > 10) {
        throw new BadRequestException('Максимум 10 пицц одного вида в заказе');
      }
    }
    const createdOrder = new this.orderModel(orderData);
    return createdOrder.save();
  }

  async findAll(): Promise<Orders[]> {
    return this.orderModel.find().exec();
  }
}
