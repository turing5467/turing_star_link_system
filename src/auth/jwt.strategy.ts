import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../module/user/user.service';
import { TOKEN_EXPIRE_TIME } from 'src/util/constant';
import { RedisCacheService } from 'src/db/redis/redis-cache.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
      passReqToCallback: true,
    } as StrategyOptions);
  }

  async validate(req, user) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const cacheToken = await this.redisCacheService.get(
      `${user.id}_${user.userName}`,
    );
    if (!cacheToken) {
      throw new UnauthorizedException('token 已过期');
    }
    if (token !== cacheToken) {
      throw new UnauthorizedException('token 不正确');
    }
    const existUser = await this.userService.findOneByUserName(user.userName);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    // token自动续期
    this.redisCacheService.set(
      `${user.id}_${user.userName}`,
      token,
      TOKEN_EXPIRE_TIME,
    );
    return existUser;
  }
}
