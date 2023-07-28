import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JudgeService } from '../judge.service';
import { SocketGateway } from '../../../../providers/socket/socket.gateway';

@Processor('judge-queue')
export class JudgeProcessor {
  constructor(
    private judgeService: JudgeService,
    private readonly socketGateway: SocketGateway,
  ) {}
  /**
   * process job
   * @param job
   * @returns
   */
  @Process('code-execution')
  async codeExecution(job: Job<any>) {
    const response = await this.judgeService._processJudge({
      createJudgeDto: job.data.createJudgeDto,
      operation: job.data.operation,
      userId: job.data.userId,
    });

    const userId = job.data.userId;
    const data = response;
    // fire event to client
    this.socketGateway.server.to(userId).emit('message', {
      from: userId,
      data: data,
    });
  }
}
