import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';

@Module({
  controllers: [ContestController],
  providers: [ContestService]
})
export class ContestModule {}
