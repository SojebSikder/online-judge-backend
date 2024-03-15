import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../providers/prisma/prisma.service';

@Injectable()
export class ProblemService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAll() {
    const data = await this.prisma.problem.findMany({
      include: {
        problem_tags: {
          select: {
            id: true,
            tag: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });
    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.problem.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        author_id: true,
        name: true,
        slug: true,
        time_limit: true,
        memory_limit: true,
        statement: true,
        input_format: true,
        output_format: true,
        note: true,
        difficulty: true,
        sample_test_cases: true,
        system_test_cases: false,
        problem_tags: {
          select: {
            id: true,
            tag: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    return data;
  }
}
