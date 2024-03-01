import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const fieldsSwagger = {
  title: {
    type: 'string',
    example: 'The Shawshank Redemption',
  },
  notes: {
    type: 'string',
    example: 'This is a great movie',
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
