import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from '../../db/prisma/prisma.service';
import { FindLinkDto } from './dto/find-link.dto';
import { SORT_TYPE, TAG_FILTER_TYPE } from 'src/util/enum';
import type { Prisma } from '@prisma/client';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}
  create(createLinkDto: CreateLinkDto, user) {
    createLinkDto.userId = user.id;
    return this.prisma.link.create({
      data: createLinkDto,
    });
  }

  findAll(user) {
    return this.prisma.link.findMany({
      where: { userId: user.id },
    });
  }

  findOne(id: number) {
    return this.prisma.link.findUnique({
      where: { id },
    });
  }

  findMany(dto: FindLinkDto, user) {
    const isOr =
      !dto.tagFilterType || dto.tagFilterType === TAG_FILTER_TYPE.union;
    const list =
      dto.tagIds
        ?.split(',')
        .map((tagId) => ({ tagIds: { contains: tagId } })) || [];
    const SearchOR: Array<Prisma.LinkWhereInput> = [
      { title: { contains: dto.search || '' } },
      { description: { contains: dto.search || '' } },
      { url: { contains: dto.search || '' } },
    ];
    const AND: Array<Prisma.LinkWhereInput> = [
      { userId: user.id },
      { hasRead: dto.hasRead },
      { OR: SearchOR },
    ];
    if (isOr) {
      AND.push({ OR: list });
    } else {
      AND.push(...list);
    }
    let sort: any;
    switch (dto.sort) {
      case SORT_TYPE.timeAsc:
        sort = [{ createTime: 'asc' }];
        break;
      case SORT_TYPE.starDesc:
        sort = [{ likeDegree: 'desc' }];
        break;
      case SORT_TYPE.starAsc:
        sort = [{ likeDegree: 'asc' }];
        break;
      default:
        sort = [{ createTime: 'desc' }];
        break;
    }
    return this.prisma.link.findMany({
      orderBy: sort,
      skip: (dto.pageNo - 1) * dto.pageSize,
      take: dto.pageSize,
      where: {
        AND,
      },
    });
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return this.prisma.link.update({
      where: { id },
      data: updateLinkDto,
    });
  }

  remove(ids: string) {
    const idList = ids.split(',').map(Number);
    return this.prisma.link.deleteMany({
      where: {
        id: { in: idList },
      },
    });
  }
}
