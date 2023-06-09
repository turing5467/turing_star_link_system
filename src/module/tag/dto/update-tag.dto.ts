import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsNotEmpty({ message: '标签名称必填' })
  @ApiProperty({ description: '标签名称' })
  tagName: string;

  @ApiProperty({ description: '标签颜色' })
  color?: string;
}
