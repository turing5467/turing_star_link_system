import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthJwt } from 'src/util/decorator/auth.decorator';
import { User } from 'src/util/decorator/user.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  MessagePattern,
  Payload,
  RmqContext,
  Ctx,
} from '@nestjs/microservices';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@User() user) {
    return this.userService.login(user);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('getInfo')
  @AuthJwt()
  getInfo(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '退出登录' })
  @Post('logout')
  @AuthJwt()
  logout(@User() user) {
    return this.userService.logout(user);
  }

  @MessagePattern('user-login')
  test(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log('mq收到消息', data, context.getPattern());
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();

    // channel.ack(originalMsg);
  }
}
