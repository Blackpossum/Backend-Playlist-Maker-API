import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  controllers: [SongsController],
  providers: [
    // standard provider technique
    SongsService,
  ],
})
export class SongsModule {}
