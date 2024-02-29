import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  notes: string;
}

export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  notes: string;
}
