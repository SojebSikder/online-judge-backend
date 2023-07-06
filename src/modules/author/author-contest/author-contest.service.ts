import { Injectable } from '@nestjs/common';
import { CreateAuthorContestDto } from './dto/create-author-contest.dto';
import { UpdateAuthorContestDto } from './dto/update-author-contest.dto';

@Injectable()
export class AuthorContestService {
  create(createAuthorContestDto: CreateAuthorContestDto) {
    return 'This action adds a new authorContest';
  }

  findAll() {
    return `This action returns all authorContest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorContest`;
  }

  update(id: number, updateAuthorContestDto: UpdateAuthorContestDto) {
    return `This action updates a #${id} authorContest`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorContest`;
  }
}
