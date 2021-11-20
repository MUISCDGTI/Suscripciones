import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateSuscriptionDto {
  @ApiProperty()
  @MaxLength(50)
  @MinLength(4)
  subject: string;
}

export default CreateSuscriptionDto;
