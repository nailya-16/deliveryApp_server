import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() body: any) {
        console.log('Получен заказ:', body);
        const order = await this.ordersService.create(body);
        return { success: true, order };
    }

    @Get()
    async getOrders() {
        return this.ordersService.findAll();
    }
}
