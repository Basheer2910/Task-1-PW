/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  addUser(): string {
    return 'User Added!';
  }
  getHello(): string {
    return 'Hello World!!!';
  }
}
