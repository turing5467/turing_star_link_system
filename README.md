<!--
 * @Author: turing5467
 * @Date: 2023-03-13 10:11:15
 * @LastEditors: turing5467
 * @LastEditTime: 2023-06-09 16:55:09
 * @Description: -
-->
- 前置条件
  - `.env` 修改mysql、redis配置
    ```
    DATABASE_URL="mysql://root:PaSsWoRd.\@localhost:3306/star_link"
    SECRET="turing5467"
    REDIS_HOST=localhost
    REDIS_POST=6379
    REDIS_DB=0
    REDIS_PASSPORT=xxx
    ```
  - 本地启动rabbitmq
    ```bash
    brew install erlang
    brew install rabbitmq
    rabbitmq-server
    ```
  - 或docker启动rabbitmq

### 启动命令

```bash
# 安装依赖
pnpm install
# 生成prisma client
npx prisma generate
# 启动项目
pnpm run start:dev
```