import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

const fieldsSwagger = {
  title: {
    type: 'string',
    example: 'The Godfather',
    validator: ['IsString', 'IsOptional'],
  },
  notes: {
    type: 'string',
    example: 'This is a great movie',
    validator: ['IsString', 'IsNotEmpty'],
  },
};

export class UpdateReviewDto {
  @ApiProperty(fieldsSwagger.title)
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty(fieldsSwagger.notes)
  @IsString()
  @IsNotEmpty()
  notes: string;
}
