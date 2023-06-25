import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private mailerService: MailerService) {}

  @Process('sendTenantInvitation')
  async sendTenantInvitation(job: Job<any>) {
    await this.mailerService.sendMail({
      to: job.data.to,
      from: job.data.from,
      subject: job.data.subject,
      template: job.data.template,
      context: job.data.context,
    });
  }

  /**
   * process job
   * @param job
   * @returns
   */
  @Process('sendMemberInvitation')
  async sendMemberInvitation(job: Job<any>) {
    await this.mailerService.sendMail({
      to: job.data.to,
      from: job.data.from,
      subject: job.data.subject,
      template: job.data.template,
      context: job.data.context,
    });
  }
}
