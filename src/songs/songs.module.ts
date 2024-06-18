/* eslint-disable prettier/prettier */
import { Module} from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constant/connection';


// for classbase providers
// const MockingService = {
//   findAll() {
//     return [{ id: 1, tittle: 'one last breath', artist: ['Creed'] }];
//   },
// };

@Module({
  controllers: [SongsController],
  providers: [
    // standard provider technique
    SongsService,
    // {
    //   provide: SongsService, //this is how to use a class Providers methods.
    //   useClass: SongsService,
    // },
    {
      provide: 'CONNECTION',       //{token_key}this is how to use a Value provider Methods.
      useValue: connection,
    },
  ],
})
export class SongsModule {}
