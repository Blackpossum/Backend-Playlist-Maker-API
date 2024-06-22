/* eslint-disable prettier/prettier */
import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './data_transfer_object/create-songs-dto';
import { Connection} from 'src/common/constant/connection';
import { song } from './songs.entity';
import { UpdateSongDto} from './data_transfer_object/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';


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
create(@Body() createSongDTO:CreateSongDTO):Promise<song> {
  return this.songsService.create(createSongDTO);
}

@Get()
findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
):Promise<Pagination<song>> {
    try{
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({
            page,
            limit,
        });
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
):Promise<song> {
    return this.songsService.findOne(id)
}

@Put(':id')
update(
    @Param('id', ParseIntPipe) id:number,
    @Body() UpdateSongDTO:UpdateSongDto,
):Promise<UpdateResult> {
    return this.songsService.update(id,UpdateSongDTO)
}

@Delete(':id')
deleteSong(@Param('id', ParseIntPipe) id:number):Promise<void> {
    return this.songsService.remove(id);
}
}

