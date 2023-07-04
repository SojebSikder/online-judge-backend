import { Injectable } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';

@Injectable()
export class ContestService {
  create(createContestDto: CreateContestDto) {
    return 'This action adds a new contest';
  }

  findAll() {
    return `This action returns all contest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contest`;
  }

  update(id: number, updateContestDto: UpdateContestDto) {
    return `This action updates a #${id} contest`;
  }

  remove(id: number) {
    return `This action removes a #${id} contest`;
  }
}
