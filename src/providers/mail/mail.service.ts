import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import appConfig from '../../config/app.config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectQueue('mail-queue') private queue: Queue,
  ) {}

  async sendTenantInvitation({ user, url }) {
    const from = `${process.env.APP_NAME} <${appConfig().mail.from}>`;
    const subject = 'Tenant Invitation';

    // add to queue
    const job = await this.queue.add('sendTenantInvitation', {
      to: user.email,
      from: from,
      subject: subject,
      template: 'tenant-invitation',
      context: {
        url: url,
      },
    });
    // await this.mailerService.sendMail({
    //   to: user.email,
    //   from: from,
    //   subject: subject,
    //   template: 'tenant-invitation',
    //   context: {
    //     url: url,
    //   },
    // });
  }

  async sendMemberInvitation({ user, member, url }) {
    const from = `${process.env.APP_NAME} <${appConfig().mail.from}>`;
    const subject = `${user.fname} is inviting you to ${appConfig().app.name}`;

    // add to queue
    const job = await this.queue.add('sendMemberInvitation', {
      to: member.email,
      from: from,
      subject: subject,
      template: 'member-invitation',
      context: {
        user: user,
        member: member,
        url: url,
      },
    });

    // await this.mailerService.sendMail({
    //   to: member.email,
    //   from: from,
    //   subject: subject,
    //   template: 'member-invitation',
    //   context: {
    //     user: user,
    //     member: member,
    //     url: url,
    //   },
    // });
  }
}
