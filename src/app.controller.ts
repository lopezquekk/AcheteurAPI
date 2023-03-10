import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProductList(
    @Query('limit') limit: number,
    @Query('offset') offset = 20,
  ): string {
    return `pagination limit: ${limit}, pagination: ${offset}`;
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
