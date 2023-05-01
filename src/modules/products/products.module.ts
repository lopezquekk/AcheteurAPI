import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/entities';
import { UserExistsRule } from 'src/validators/user.validator';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), UserModule],
  controllers: [ProductsController],
  providers: [ProductsService, UserExistsRule],
})
export class ProductsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
