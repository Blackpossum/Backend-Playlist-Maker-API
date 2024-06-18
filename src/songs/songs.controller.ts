/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './data_transfer_object/create-songs-dto';
import { Connection} from 'src/common/constant/connection';


@Controller({
    path:'songs',
    scope:Scope.REQUEST
})
export class SongsController {
    constructor(
        private songsService:SongsService,
        // inject provider to connect to database
        @Inject('CONNECTION')
        private connection:Connection
    ){
        console.log("connect to establish to :", connection.CONNECTION_STRING);
    }

@Post()
create(@Body() createSongDTO:CreateSongDTO) {
  return this.songsService.create(createSongDTO);
}

@Get()
findAll(): any {
    try{
        return this.songsService.findAll();
    }
    catch(e) {
        // to catch error that throw by songs.service 
        throw new HttpException(
            'from the catch block.song.controles/GET :server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
            {
                cause:e,
            },
        )
    }
}

@Get(':id')
findOne(
    //use Param decorators from next js to retrieve the 'id' query
    //use ParseIntPipe to convert the value into Number
    @Param('id',ParseIntPipe) 
    id: number,
) {
    return `serve : song ${id} that requested`
}

@Put(':id')
update():string {
    const id: number = 2;
    return `Update : song ${id} that requested`
}

@Delete(':id')
DeleteSongs():string {
    return `Delete song based on id`
}
}

