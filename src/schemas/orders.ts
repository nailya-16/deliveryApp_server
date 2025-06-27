import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Orders extends Document {
    @Prop()
    customerName: string;

    @Prop()
    customerPhone: string;

    @Prop({ type: [{ pizzaName: String, quantity: Number }] })
    cart: { pizzaName: string; quantity: number }[];
    
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);