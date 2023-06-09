import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty({ message: '标签名称必填' })
  @ApiProperty({ description: '标签名称' })
  tagName: string;

  @ApiProperty({ description: '标签颜色' })
  color?: string;
  @ApiProperty({ description: '所属用户id' })
  userId: number;
  @ApiProperty({ description: '标签组id' })
  parentId?: number;
}
