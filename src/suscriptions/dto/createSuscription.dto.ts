import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Categories } from '../../enums/categories';

class CreateSuscriptionDto {
  @ApiProperty()
  @MaxLength(50)
  @MinLength(4)
  subject: string;

  @ApiProperty()
  @MaxLength(50)
  @MinLength(4)
  @IsEmail()
  mail: string;

  @IsEnum(Categories)
  @ApiProperty({enum: Categories})
  category: Categories;
}

export default CreateSuscriptionDto;
