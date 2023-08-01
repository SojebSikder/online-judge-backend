import { Module } from '@nestjs/common';
import { AuthorContestService } from './author-contest.service';
import { AuthorContestController } from './author-contest.controller';

@Module({
  controllers: [AuthorContestController],
  providers: [AuthorContestService]
})
export class AuthorContestModule {}
