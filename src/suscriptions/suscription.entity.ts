import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '../enums/categories';

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

  @IsEnum(Categories)
  @ApiProperty({enum: Categories})
  @Column()
  @MaxLength(8)
  @MinLength(7)
  category: Categories;
}
