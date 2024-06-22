/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { song } from './songs/songs.entity';

// usability of a app.module is to creating and manage dependency registration via logger
// every dependencies from service module register here
// adding middleware to interact with server bussines logic
// placing controller 


@Module({
  imports: [
    // import typeOrm module here to connect with database
    TypeOrmModule.forRoot(
      {
        type:'postgres',
        database:'Music_Platform_API',
        host:'localhost',
        port:5432,
        username:'postgres',
        password:'583907',
        entities:[song,],
        synchronize:true,
      }
    ),
    SongsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: DevConfigService,  // inject DevConfigService class in here  
      useClass: DevConfigService
    } 
  ],  
})
// to use middleware, need to implement on export app module
export class AppModule implements NestModule {
  constructor(private dataSource:DataSource){
    console.log('dbname', dataSource.driver.database)
  }
  configure(consumer: MiddlewareConsumer) {
    // add your middleware here using this method:
    // option no.1 
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); //define what route should middleware works for
    //option number 2:
    consumer.apply(LoggerMiddleware).forRoutes({path:'songs',method:RequestMethod.POST});
  }
}
