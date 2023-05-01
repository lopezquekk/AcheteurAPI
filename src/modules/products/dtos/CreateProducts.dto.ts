import {
  IsDate,
  IsNotEmpty,
  IsUUID,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserExistsRule } from 'src/validators/user.validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @ApiProperty()
  @IsDate()
  @MinLength(4)
  purchaseDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  dueDate: Date;

  @ApiProperty({ description: 'uuid from a valid user' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
