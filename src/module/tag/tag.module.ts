/*
 * @Author: turing5467
 * @Date: 2023-03-21 14:06:20
 * @LastEditors: turing5467
 * @LastEditTime: 2023-05-30 14:06:00
 * @Description: TagModule
 */
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
