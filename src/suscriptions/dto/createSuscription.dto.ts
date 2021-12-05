import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

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
}

export default CreateSuscriptionDto;
