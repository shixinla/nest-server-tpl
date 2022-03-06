import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiConfig, ServerConfig, CONFIG_TYPE } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const apiConfig = configService.get<ApiConfig>(CONFIG_TYPE.API);
  const serverConfig = configService.get<ServerConfig>(CONFIG_TYPE.SERVER);

  const httpAdapter = app.get(HttpAdapterHost);
  const apiPrefix = `/${apiConfig.prefix}/${apiConfig.version}`;

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const options = new DocumentBuilder()
    .setTitle(apiConfig.title)
    .setContact(apiConfig.maintain, undefined, apiConfig.contact)
    .setDescription(apiConfig.description)
    .setVersion(apiConfig.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`doc${apiPrefix}`, app, document);

  await app.listen(serverConfig.port);

  console.log(
    `api doc url: http://${serverConfig.host}:${serverConfig.port}/doc${apiPrefix}`,
  );
}
bootstrap();
