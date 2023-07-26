import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JudgeService } from '../judge.service';

@Processor('judge-queue')
export class JudgeProcessor {
  constructor(private judgeService: JudgeService) {}
  /**
   * process job
   * @param job
   * @returns
   */
  @Process('code-execution')
  async codeExecution(job: Job<any>) {
    await this.judgeService._processJudge({
      createJudgeDto: job.data.createJudgeDto,
      operation: job.data.operation,
      userId: job.data.userId,
    });
  }
}
