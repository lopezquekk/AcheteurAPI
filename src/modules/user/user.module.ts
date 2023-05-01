import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryExistsRule } from 'src/validators/country.validator';
import { User } from '../../entities/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CountryModule } from '../country/country.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    CountryModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, CountryExistsRule],
})
export class UserModule {}
