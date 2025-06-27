import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Orders, OrdersSchema } from "src/schemas/orders";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema}])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}