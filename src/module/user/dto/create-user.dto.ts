import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账号' })
  @IsNotEmpty({ message: '账号必填' })
  userName: string;

  @IsNotEmpty({ message: '密码必填' })
  @ApiProperty({ description: '密码' })
  password: string;
}
