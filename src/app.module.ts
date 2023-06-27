import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JudgeModule } from './modules/app/judge/judge.module';
import { RawBodyMiddleware } from './common/middleware/rawBody.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { ThrottlerBehindProxyGuard } from './common/guard/throttler-behind-proxy.guard';
import { ProblemModule } from './modules/app/problem/problem.module';
import { SubmissionModule } from './modules/app/submission/submission.module';
import { AbilityModule } from './providers/ability/ability.module';
import { UserModule } from './modules/app/user/user.module';
import { MailModule } from './providers/mail/mail.module';

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
    AbilityModule,
    MailModule,
    UserModule,
    JudgeModule,
    ProblemModule,
    SubmissionModule,
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
