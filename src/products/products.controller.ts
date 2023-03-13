import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  // addProduct(@Body() body: { title: string, description: string, price: number }) -- this is the same as the next line
  async addProduct(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number): Promise<{ id: string}> {
    const generatedId = await this.productsService.insertProduct(title, description, price);
    return { id: generatedId };
  }

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') description: string, @Body('price') price: number) {
    return this.productsService.updateProduct(id, title, description, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteproduct(id);
  }
}