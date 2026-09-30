import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Keyboard' })
  @IsString()
  @MinLength(1)
  name: string;
  @ApiPropertyOptional({ example: 'Mechanical 75%' })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({ example: 49.99 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;
}
