import { Module } from '@nestjs/common';
import { AuthorProblemService } from './author-problem.service';
import { AuthorProblemController } from './author-problem.controller';

@Module({
  controllers: [AuthorProblemController],
  providers: [AuthorProblemService]
})
export class AuthorProblemModule {}
