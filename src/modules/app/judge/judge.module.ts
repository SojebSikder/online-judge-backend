import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { BullModule } from '@nestjs/bull';
import { JudgeProcessor } from './processors/judge.processor';
import { SocketModule } from '../../../providers/socket/socket.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'judge-queue',
    }),
    SocketModule,
  ],
  controllers: [JudgeController],
  providers: [JudgeService, JudgeProcessor],
})
export class JudgeModule {}
