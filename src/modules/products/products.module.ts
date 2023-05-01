import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products, User } from 'src/entities/entities';
import { UserExistsRule } from 'src/validators/user.validator';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { UserService } from '../user/user.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UserExistsRule, UserService],
})
export class ProductsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
