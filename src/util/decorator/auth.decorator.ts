/*
 * @Author: turing5467
 * @Date: 2023-03-14 11:49:14
 * @LastEditors: turing5467
 * @LastEditTime: 2023-06-01 17:29:10
 * @Description: AuthJwt
 */
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function AuthJwt() {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}
