/* eslint-disable prettier/prettier */

import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

// create decorated phase validation 
export class CreateSongDTO{
//  add properties for this class object
    @IsString() //use decorators for validating rule from package "class-validation"
    @IsNotEmpty()
        readonly tittle:string;

    @IsArray() 
    @IsString({each:true})
    @IsNotEmpty({each:true})
        readonly artist:string[];

    @IsNotEmpty()
    @IsDateString()
        readonly releaseDate:Date;

    @IsMilitaryTime()
    @IsNotEmpty()
        readonly duration:Date;
}