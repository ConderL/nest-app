### Get Start

全局安装nestjs-cli

`npm i -g @nestjs/cli`

查看nestjs版本

`nest --version`

初始化nest项目

`nest new`

生成有`person`的crud接口的服务

`nest g resource person`

### controller

主要用于 **接收 HTTP 请求 ** **处理输入** **调用服务** **返回响应**

`nest g co` 全称 `nest generate controller` 

 `--no-spec`不需要测试文件

`module/abc`新增到对应目录下

`--dry-run`测试添加

### Service

主要用于提供数据以及与数据源的交互, **业务逻辑** **数据存取** **封装外部功能** **状态管理** **依赖注入**

`nest g s` 全称 `nest generate service`

### Mudule

用来**定义组件** **组织依赖关系** **提供配置** **导入其他模块**

`nest g module` 

### middleware

生成路由中间件

`nest g middleware`

生成路由守卫

`nest g guard`

生成拦截器

`nest g interceptor`

对参数进行校验

`nest g pipe`

创建一个filter

`nest g filter`

### DTO

**DTO** 数据传输对象，全称 "data transfer object"

`nest g class directory/dto/name.dto --no-spec`

### Validate

`app.useGlobalPipes(new ValidationPipe());`

`npm i class-validator class-transformer`

### Mapped-types

`npm i @nestjs/mapped-types`

### Docker

安装[docker](https://docker.com)

配置docker-compose.yml文件

```yaml
version: "3"

services:
  db:
    image: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: pass123
```

分离启动服务`docker-compose up -d`

安装数据库支持`npm i @nestjs/typeorm typeorm pg`
