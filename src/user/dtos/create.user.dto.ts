import {
  IsEmail,
  IsNotEmpty,
  IsUUID,
  MinLength,
  Validate,
} from 'class-validator';
import { CountryExistsRule } from '../../validators/country.validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  lastName: string;

  @ApiProperty({ description: 'uuid from a valid country' })
  @IsNotEmpty()
  @IsUUID()
  @Validate(CountryExistsRule)
  countryId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
