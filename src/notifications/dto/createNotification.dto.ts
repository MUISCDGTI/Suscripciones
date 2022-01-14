import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateNotificationDto {
  @ApiProperty()
  @MaxLength(50)
  @MinLength(4)
  topic: string;

  @ApiProperty()
  @MaxLength(50)
  @MinLength(4)
  type: string;
}

export default CreateNotificationDto;
