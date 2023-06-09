import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { PrismaService } from '../db/prisma/prisma.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { userName: username },
    });

    if (!user) {
      throw new HttpException('用户名不正确！', 400);
    }

    if (!compareSync(password, user.password)) {
      throw new HttpException('密码错误！', 400);
    }

    return user;
  }
}
