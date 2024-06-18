import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  DB_HOST = 'localhost';
  get_DBHOST() {
    return this.DB_HOST;
  }
}
