import { Injectable, NotFoundException } from "@nestjs/common";
import { Products } from "./products.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Products') private readonly productModel: Model<Products>) {}

  async insertProduct(title: string, desc: string, price: number): Promise<string> {
    const newProduct = new this.productModel({
      title, desc, price
    });
    
    const result = await newProduct.save()
    return result._id.toString() as string;
  }

  getProducts() {
    return this.productModel.find().exec(); 
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id)
    return {id: product.id, title: product.title, desc: product.desc, price: product.price};
  }

  async updateProduct(id: string, title: string, desc: string, price: number) {
    const updatedProduct = await this.findProduct(id);
    if(title) {
      updatedProduct.title = title;
    }
    if(desc) {
      updatedProduct.desc = desc;
    }
    if(price) {
      updatedProduct.price = price;
    }
    
    updatedProduct.save()
    return updatedProduct;
  }

  async deleteproduct(id: string) {
    this.productModel.deleteOne({_id: id}).exec() 
  }

  private async findProduct(id: string): Promise<Products> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch(error) {
      throw new NotFoundException('Could not find product.');
    }
    if(!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}