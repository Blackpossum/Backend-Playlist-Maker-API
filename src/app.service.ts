/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(private devConfig:DevConfigService){} //inject the useClass DevConfigService that already define in app module in here
  getHello(): string {
    return `Welcome to MusicApp API ${this.devConfig.get_DBHOST()}`;
  }
}
