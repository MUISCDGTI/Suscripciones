import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Categories } from '../../enums/categories';

class CreateNotificationDto {
  @ApiProperty()
  @MaxLength(50)
  @MinLength(4)
  topic: string;

  @IsEnum(Categories)
  @ApiProperty({enum: Categories})
  category: Categories;

  @ApiProperty()
  @MaxLength(50)
  @MinLength(4)
  referenceId: string;
}

export default CreateNotificationDto;
