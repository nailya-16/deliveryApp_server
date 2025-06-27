import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pizza, PizzaDocument } from 'src/schemas/pizza';

@Injectable()
export class PizzaService {
    constructor(@InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>) {
        console.log('pizzaService run');
    }

    async getAllPizzas(): Promise<Pizza[]> {
        return this.pizzaModel.find();
    }

    async getPizzaById(id: string): Promise<Pizza | null> {
        return this.pizzaModel.findById(id);
    }

    async createPizza(data): Promise<Pizza> {
        const pizzaData = new this.pizzaModel(data);
        return pizzaData.save();
    }

    async updatePizza(id: string, data): Promise<Pizza | null> {
        return this.pizzaModel.findByIdAndUpdate(id, data, { new: true});
    }

    async deleteAllPizzas(): Promise<any> {
        return this.pizzaModel.deleteMany();
    }

    async deletePizzaById(id: string): Promise<Pizza | null> {
        return this.pizzaModel.findByIdAndDelete(id);
    } 
}
