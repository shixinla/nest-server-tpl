## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run
# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TODO

- [x] 统一响应格式，统一错误处理，异常拦截，业务异常封装
- [ ] 异常状态码补全
- [ ] 权限校验
- [ ] typeorm
- [ ] swagger

## 本地开发数据库环境搭建

- 安装 docker
- 下载 mysql 镜像， `docker pull mysql`
- 运行 docker 容器，`docker run --name database-dev -p 23311:3306 -e MYSQL_ROOT_PASSWORD=Admin123 -d mysql`

`ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Admin123';`

mysql8 之前的版本
`GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED WITH GRANT OPTION;`
`FLUSH PRIVILEGES;`

mysql8
`CREATE USER root@'%' IDENTIFIED BY 'Admin123';`
`GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;`
`FLUSH PRIVILEGES;`

## 打包镜像部署腾讯云托管

`docker build -t xxx .`
