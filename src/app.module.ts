import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [AppService],
})
export class AppModule {}
