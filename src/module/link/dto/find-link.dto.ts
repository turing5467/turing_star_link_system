import { ApiProperty } from '@nestjs/swagger';
import { PageDTO } from 'src/util/dto/PageDTO';
import { SORT_TYPE, TAG_FILTER_TYPE } from 'src/util/enum';

export class FindLinkDto extends PageDTO {
  @ApiProperty({ description: '标题或描述' })
  search?: string;

  @ApiProperty({ description: '链接标签id，,隔开' })
  tagIds = '';

  @ApiProperty({ description: '过滤类型：并集1，交集2' })
  tagFilterType: TAG_FILTER_TYPE = TAG_FILTER_TYPE.union;

  // @ApiProperty({ description: '链接喜欢程度：0-10' })
  // likeDegree = 0;

  sort: SORT_TYPE = SORT_TYPE.timeDesc;

  @ApiProperty({ description: '是否已读' })
  hasRead = false; // 是否已读

  userId: number;
}
