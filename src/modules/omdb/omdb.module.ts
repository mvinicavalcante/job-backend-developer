import { Module } from '@nestjs/common';
import { OmdbProvider } from './omdb.provider';

@Module({
  providers: [OmdbProvider],
  exports: [OmdbProvider],
})
export class OmdbModule {}
