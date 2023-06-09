/*
 * @Author: turing5467
 * @Date: 2023-03-14 09:25:12
 * @LastEditors: turing5467
 * @LastEditTime: 2023-05-30 14:58:33
 * @Description: userService
 */
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../db/prisma/prisma.service';
import { hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_EXPIRE_TIME } from 'src/util/constant';
import { RedisCacheService } from 'src/db/redis/redis-cache.service';
import { getUserSocket } from 'src/util/socket';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private redisCacheService: RedisCacheService,
    @Inject('MATH_SERVICE') private readonly client: ClientProxy,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // 注意prisma的方法基本都是异步的，需await
    if (
      await this.prisma.user.findUnique({
        where: { userName: createUserDto.userName },
      })
    ) {
      throw new HttpException('用户已存在', 400);
    }
    createUserDto.password = hashSync(createUserDto.password, 10);
    return this.prisma.user.create({ data: createUserDto });
  }

  createToken(user) {
    return this.jwtService.sign(user);
  }

  async login(user) {
    const oldToken = this.redisCacheService.get(`${user.id}_${user.userName}`);
    // 顶号通知
    if (oldToken) {
      const socket = getUserSocket(user.userName);
      socket?.emit('forceLogOut', {});
    }
    const token = this.createToken(user);
    await this.redisCacheService.set(
      `${user.id}_${user.userName}`,
      token,
      TOKEN_EXPIRE_TIME,
    );
    this.client.send('user-login', 'test-string').subscribe();
    return token;
  }

  logout(user) {
    this.redisCacheService.delete(`${user.id}_${user.userName}`);
  }

  findOneByUserName(userName: string) {
    return this.prisma.user.findUnique({ where: { userName } });
  }
}
