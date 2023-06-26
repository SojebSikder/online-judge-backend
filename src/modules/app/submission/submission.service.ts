import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { PrismaService } from '../../../providers/prisma/prisma.service';

@Injectable()
export class SubmissionService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  create(createSubmissionDto: CreateSubmissionDto) {
    return 'This action adds a new submission';
  }

  async findAll(userId) {
    const result = await this.prisma.submission.findMany({
      where: {
        user_id: userId,
      },
    });
    return result;
  }

  async findOne(userId, id: number) {
    const result = await this.prisma.submission.findMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            user_id: userId,
          },
        ],
      },
    });

    if (result) {
      return result[0];
    } else {
      return false;
    }
  }

  update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    return `This action updates a #${id} submission`;
  }

  remove(id: number) {
    return `This action removes a #${id} submission`;
  }
}
