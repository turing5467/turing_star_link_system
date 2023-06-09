/*
 * @Author: turing5467
 * @Date: 2023-03-21 14:06:20
 * @LastEditors: turing5467
 * @LastEditTime: 2023-05-30 14:37:50
 * @Description: TagService
 */
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../../db/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTagDto: CreateTagDto, user) {
    createTagDto.userId = user.id;
    return this.prisma.tag.create({ data: createTagDto });
  }

  findAll(user) {
    return this.prisma.tag.findMany({
      where: { userId: user.id },
    });
  }

  findByParentId(parentId, user) {
    return this.prisma.tag.findMany({
      where: {
        userId: user.id,
        parentId: parentId,
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  async remove(id: number) {
    const tag = await this.prisma.tag.delete({
      where: { id },
    });
    // 如果是标签组，则删除标签组下所有标签
    if (!tag.parentId) {
      const { count } = await this.prisma.tag.deleteMany({
        where: { parentId: tag.id },
      });
      return count + 1;
    }
    return 1;
  }

  getHello() {
    return 'hello';
  }
}
