import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JudgeModule } from './modules/app/judge/judge.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { BullModule } from '@nestjs/bull';
import { RawBodyMiddleware } from './common/middleware/rawBody.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { ThrottlerBehindProxyGuard } from './common/guard/throttler-behind-proxy.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    BullModule.forRoot({
      redis: {
        host: appConfig().redis.host,
        password: appConfig().redis.password,
        port: +appConfig().redis.port,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PrismaModule,
    AuthModule,
    JudgeModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    // for the raw body
    consumer.apply(RawBodyMiddleware).forRoutes('*');
  }
}
