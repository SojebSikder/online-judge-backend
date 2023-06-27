import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailService } from './mail.service';
import appConfig from '../../config/app.config';
import { MailProcessor } from './processors/mail.processor';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: appConfig().mail.host,
        secure: false,
        auth: {
          user: appConfig().mail.user,
          pass: appConfig().mail.password,
        },
      },
      defaults: {
        from: appConfig().mail.from,
      },
      template: {
        // dir: join(__dirname, 'templates'),
        dir: process.cwd() + '/dist/mail/templates/',
        // adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        adapter: new EjsAdapter(),
        options: {
          // strict: true,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
