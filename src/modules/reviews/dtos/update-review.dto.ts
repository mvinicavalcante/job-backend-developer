import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const fieldsSwagger = {
  notes: {
    type: 'string',
    example: 'This is a great movie',
  },
};

export class UpdateReviewDto {
  @ApiProperty(fieldsSwagger.notes)
  @IsString()
  @IsNotEmpty()
  notes: string;
}
