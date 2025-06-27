import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';

export type PizzaDocument = Pizza & Document;

@Schema()
export class Pizza {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    price: number;

    @Prop()
    description?: string;

    @Prop()
    image?: string;
}

export const PizzaSchema =SchemaFactory.createForClass(Pizza);