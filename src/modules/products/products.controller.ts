import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Products } from 'src/entities/entities';
import { JWTAuthGuard } from 'src/modules/auth/jwt.guard';
import { ProductsService } from './products.service';
import { User } from '../auth/decorator/user.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JWTAuthGuard)
  @ApiOperation({ description: 'get list of the user products' })
  @Get()
  async getProductList(
    @User('userId') userId: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 20,
  ): Promise<Products[]> {
    return await this.productsService.findAll(limit, offset, userId);
  }

  @Post()
  createProduct(@Body() payload: any): any {
    return {
      isSuccess: true,
      payload,
    };
  }

  /*
  @Get()
  getProductList(@Query() params: any): string {
    const { limit, offset } = params;
    return `pagination limit: ${limit}, pagination: ${offset}`;
  }
  */
  @Get(':productId')
  getProductById(@Param('productId') productId: string): string {
    return `Product ID: ${productId}`;
  }
}
