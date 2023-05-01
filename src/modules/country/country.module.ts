import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { Country } from 'src/entities/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  exports: [CountryService],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
