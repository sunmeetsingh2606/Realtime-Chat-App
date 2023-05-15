import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ApiResponseInterceptor } from './shared/interceptors/api-response.interceptor';
import { ChatsModule } from './chats/chats.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>('DATABASE_URL'),
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        ChatsModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({ whitelist: true }),
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ApiResponseInterceptor,
        },
        AppService,
    ],
})
export class AppModule {}
