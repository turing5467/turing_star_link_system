/*
 * @Author: turing5467
 * @Date: 2023-03-13 10:11:15
 * @LastEditors: turing5467
 * @LastEditTime: 2023-06-09 16:51:47
 * @Description: -
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
