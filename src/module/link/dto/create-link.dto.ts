import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import type { Prisma } from '@prisma/client';

export type LinkCreateInput = Prisma.LinkCreateInput;
export type LinkUpdateInput = Prisma.LinkUpdateInput &
  Prisma.LinkWhereUniqueInput;

export class CreateLinkDto {
  @ApiProperty({ description: '链接标题' })
  @IsNotEmpty({ message: '标题必填' })
  title: string;

  @ApiProperty({ description: '链接地址' })
  @IsNotEmpty({ message: 'url必填' })
  url: string;

  @ApiProperty({ description: '链接标签id，,隔开' })
  tagIds?: string;

  @ApiProperty({ description: '链接描述' })
  description?: string;

  @ApiProperty({ description: '链接缩略图' })
  thumb?: string;

  @ApiProperty({ description: '链接喜欢程度：0-10' })
  likeDegree = 0;

  @ApiProperty({ description: '是否已读' })
  hasRead = false; // 是否已读

  userId: number;
}
