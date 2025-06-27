import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { Pizza } from 'src/schemas/pizza';

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) {}

    @Get()
    async getAllPizzas(): Promise<Pizza[]> {
        return this.pizzaService.getAllPizzas();
    }

    @Get(':id')
    async getPizzaById(@Param('id') id: string): Promise<Pizza | null> {
        return this.pizzaService.getPizzaById(id);
    }

    @Post()
    async createPizza(@Body() data): Promise<Pizza> {
        return this.pizzaService.createPizza(data);
    }

    @Put(':id')
    async updatePizza(@Param('id') id: string, @Body() data): Promise<Pizza | null> {
        return this.pizzaService.updatePizza(id, data);
    }

    @Delete()
    async deleteAllPizzas() {
        return this.pizzaService.deleteAllPizzas();
    }

    @Delete(':id')
    async deletePizzaById(@Param('id') id: string): Promise<Pizza | null> {
        return this.pizzaService.deletePizzaById(id);
    }
}
