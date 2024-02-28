import { Injectable } from '@nestjs/common';
import { ApiOMDbHelper } from 'src/helpers/apiOMDb';

@Injectable()
export class ReviewsService {
  constructor(private readonly apiOMDbHelper: ApiOMDbHelper) {}
}
