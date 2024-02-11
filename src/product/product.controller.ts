import { Controller,Get,Post,Res,HttpStatus, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){}

    @Post('/create')
async createPost(@Res() res,@Body() createProductDTO:CreateProductDTO){
const product =await this.productService.createProduct(createProductDTO);
return res.status(HttpStatus.OK).json({
    message:'Product Successfully Created',
    product
});
}

@Get('/')
async getProducts(@Res() res){
    const products = await this.productService.getProducts()
   return res.status(HttpStatus.OK).json(products);

}
@Get('/:productId')
async getProduct(@Res() res,@Param('productId') productId){
    const product = await this.productService.getProduct(productId);
    if(!product) return res.status(HttpStatus.OK).json('Product not found');
    return res.status(HttpStatus.OK).json(product);
}
@Delete('/delete')
async deleteProduct(@Res() res,@Query('productId') productId){
    const product = await this.productService.deleteProduct(productId);
    if(!product) return res.status(HttpStatus.OK).json('Product not found');
    return res.status(HttpStatus.OK).json({
        message:'Product Deleted Successfully',
        product
    });
}
@Patch('/update')
async updateProduct(@Res() res,@Body() createProductDTO:CreateProductDTO,@Param('productId') productId){
    const product = await this.productService.updateProduct(productId,createProductDTO);
    if(!product) return res.status(HttpStatus.OK).json('Product not found');
    return res.status(HttpStatus.OK).json({
        message:'Product Updated Successfully',
        product
    });
}
}
