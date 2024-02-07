import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

getProducts=async():Promise<Product[]>=>{
    const products=await this.productModel.find();
    return products;
}
getProduct(productId:string):Promise<Product>{
    return this.productModel.findById(productId);
}
async createProduct(createProductDTO:CreateProductDTO):Promise<Product>{
    const product=new this.productModel(createProductDTO);
    return product.save();


}
async deleteProduct(productId:string):Promise<Product>{
    const deleteProduct= await this.productModel.findByIdAndDelete(productId);
    return deleteProduct;
}

async updateProduct(productId:string,createProductDTO:CreateProductDTO):Promise<Product>{
    const updateProduct=await this.productModel.findByIdAndUpdate(productId,createProductDTO,{new:true});
    return updateProduct;
}
}
