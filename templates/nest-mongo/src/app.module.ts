import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { DBConfig } from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG_TYPE } from '@/config/configuration';
import { Connection } from 'mongoose';
import { mongoosePagination } from 'mongoose-paginate-ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        './env/.env.development.local',
        './env/.env.test',
        './env/.env.production',
      ],
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<DBConfig>(CONFIG_TYPE.DB);
        return {
          uri: dbConfig.mongoUri,
          dbName: dbConfig.name,
          connectionFactory: (connection: Connection) => {
            connection.plugin(mongoosePagination);
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: JWTAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
