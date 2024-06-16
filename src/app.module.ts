/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';


@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
// to use middleware, need to implement on export app module
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // add your middleware here using this method:
    // option no.1 
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); //define what route should middleware works for
    //option number 2:
    consumer.apply(LoggerMiddleware).forRoutes({path:'songs',method:RequestMethod.POST});
  }
}
