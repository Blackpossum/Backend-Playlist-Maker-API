/* eslint-disable prettier/prettier */
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { song } from './songs.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './data_transfer_object/create-songs-dto';
import { UpdateSongDto } from './data_transfer_object/update-song.dto';
import { Pagination,paginate,IPaginationOptions } from 'nestjs-typeorm-paginate';


@Injectable({
    scope: Scope.TRANSIENT,
})
export class SongsService {
    constructor(
        @InjectRepository(song)
            private songRepository: Repository<song>,
    ) {}
    async create(songDTO:CreateSongDTO): Promise<song> {
        // save song in the database
        const Song = new song();
        Song.title = songDTO.title;
        Song.artist = songDTO.artist;
        Song.duration = songDTO.duration;
        Song.lyric = songDTO.lyric;
        Song.releaseDate = songDTO.releaseDate;

        return await this.songRepository.save(Song);
    }
    findAll():Promise<song[]> {
        // // fetch all song in the DB
        if (!this) {
            throw new Error('No songs found');
        }
        return this.songRepository.find();
    }
    async findOne(id: number): Promise<song> {
        // fetch a single song by its id
        return await this.songRepository.findOneBy({ id });
    }

    update(id:number, recordToUpdate: UpdateSongDto): Promise<UpdateResult>{
        return this.songRepository.update(id, {...recordToUpdate});
    }

    async remove(id: number): Promise<void> {
        // delete a song by its id
        await this.songRepository.delete(id);
    }


    async paginate(options:IPaginationOptions):Promise<Pagination<song>>{
        return paginate<song>(this.songRepository, options);
    }
    // async paginating(pageSize:number, page:number):Promise<Pagination<song>> {
    //     const [data, count] = await this.songRepository.findAndCount({
    //         skip: (page - 1) * pageSize,
    //         take: pageSize,
    //     });
    //     return { data, count };
    // }
}
