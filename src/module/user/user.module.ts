/*
 * @Author: turing5467
 * @Date: 2023-03-14 09:25:12
 * @LastEditors: turing5467
 * @LastEditTime: 2023-05-30 15:08:15
 * @Description: userModule
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RedisCacheModule } from '../../db/redis/redis-cache.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET'),
      // signOptions: { expiresIn: '4h' },
      // 修改为通过redis设置过期时间
    };
  },
});

@Module({
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'turing_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    jwtModule,
    RedisCacheModule,
  ],
  exports: [jwtModule],
})
export class UserModule {}
