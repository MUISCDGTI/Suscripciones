import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Suscription {
  @ApiProperty()
  @ObjectIdColumn({ generated: true })
  _id: string;

  @ApiProperty()
  @Column()
  @MaxLength(50)
  @MinLength(4)
  subject: string;

  @ApiProperty()
  @Column()
  @MaxLength(50)
  @MinLength(4)
  @IsEmail()
  mail: string;

  @ApiProperty()
  @Column()
  @MaxLength(8)
  @MinLength(7)
  category: string;
}
