/*
 * @Author: turing5467
 * @Date: 2023-03-21 14:06:20
 * @LastEditors: turing5467
 * @LastEditTime: 2023-05-30 14:57:21
 * @Description: TagController
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthJwt } from 'src/util/decorator/auth.decorator';
import { User } from 'src/util/decorator/user.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('tag')
export class TagController {
  @Inject(TagService)
  private readonly tagService: TagService;

  @ApiOperation({ summary: '创建标签' })
  @AuthJwt()
  @Post()
  create(@Body() createTagDto: CreateTagDto, @User() user) {
    return this.tagService.create(createTagDto, user);
  }

  @ApiOperation({ summary: '获取当前用户所有标签' })
  @AuthJwt()
  @Get()
  findAll(@User() user) {
    return this.tagService.findAll(user);
  }

  @ApiOperation({ summary: '获取当前用户指定标签组下的标签' })
  @AuthJwt()
  @Get(':parentId')
  findByParentId(@Param('parentId') parentId: string, @User() user) {
    return this.tagService.findByParentId(+parentId, user);
  }

  @ApiOperation({ summary: '修改标签' })
  @AuthJwt()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @ApiOperation({ summary: '删除标签' })
  @AuthJwt()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
