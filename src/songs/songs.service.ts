/* eslint-disable prettier/prettier */
import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope: Scope.TRANSIENT,
    
})
export class SongsService {
    private readonly songs = [];
    create(song) {
        // save song in the database
        this.songs.push(song);
        return this.songs;
    }
    findAll() {
        // fetch all song in the DB
        // error handling if DB is empty
        if (this.songs.length === 0) {
            throw new Error('No songs found');
        }
        return this.songs;
    }
}
