import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../providers/prisma/prisma.service';

@Injectable()
export class AuthorService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  create(createAuthorDto: CreateAuthorDto) {
    return 'This action adds a new author';
  }

  async findAll(userId: number) {
    const contest = await this.prisma.contest.count({
      where: {
        author_id: userId,
      },
    });
    const problem = await this.prisma.problem.count({
      where: {
        author_id: userId,
      },
    });

    const data = {
      contest_count: contest,
      problem_count: problem,
    };

    return { success: true, data: data };
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
