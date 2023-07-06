import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../providers/prisma/prisma.service';

@Injectable()
export class ContestService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAll() {
    const data = await this.prisma.contest.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        start_at: true,
        end_at: true,
        contest_type: true,
        participant_type: true,
        author_id: true,
        created_at: true,
        updated_at: true,
      },
    });
    return { success: true, data: data };
  }

  async findOne(id: number) {
    const data = await this.prisma.contest.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        start_at: true,
        end_at: true,
        contest_type: true,
        participant_type: true,
        author_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return { success: true, data: data };
  }
}
