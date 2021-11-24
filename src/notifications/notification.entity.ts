import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Notification {
  @ApiProperty()
  @ObjectIdColumn({ generated: true })
  _id: string;

  @ApiProperty()
  @Column()
  @MaxLength(50)
  @MinLength(4)
  topic: string;
}
