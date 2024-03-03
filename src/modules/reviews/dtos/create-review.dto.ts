import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const fieldsSwagger = {
  title: {
    type: 'string',
    example: 'The Shawshank Redemption',
    validator: ['IsString', 'IsNotEmpty'],
  },
  notes: {
    type: 'string',
    example: 'This is a great movie',
    validator: ['IsString', 'IsNotEmpty'],
  },
};

export class CreateReviewDto {
  @ApiProperty(fieldsSwagger.title)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty(fieldsSwagger.notes)
  @IsString()
  @IsNotEmpty()
  notes: string;
}
