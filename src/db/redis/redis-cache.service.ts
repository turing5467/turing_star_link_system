import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  set(key: string, value: string, ttl: number): Promise<any> {
    return this.cacheManager.set(key, value, { ttl });
  }

  get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  delete(key): Promise<any> {
    return this.cacheManager.del(key);
  }
}
