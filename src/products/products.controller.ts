import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Client } from 'pg';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'acheteur_db',
  password: '123456',
  port: 5432,
});

client.connect();

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  // constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'get list of the user products' })
  @Get()
  getProductList(
    @Query('limit') limit: number,
    @Query('offset') offset = 20,
  ): string {
    client.query('SELECT * FROM Products', (err, res) => {
      console.error(err);
      console.log(res);
    });
    return `pagination limit: ${limit}, pagination: ${offset}`;
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
