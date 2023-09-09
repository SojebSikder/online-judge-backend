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
        contest_visibility: true,
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
        ContestProblem: {
          orderBy: {
            sort_order: 'asc',
          },
          select: {
            max_score: true,
            sort_order: true,
            problem: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        start_at: true,
        end_at: true,
        contest_visibility: true,
        participant_type: true,
        author_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return { success: true, data: data };
  }
  async findProblemOne(id: number, problemId: number) {
    const data = await this.prisma.contest.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        ContestProblem: {
          orderBy: {
            sort_order: 'asc',
          },
          where: {
            problem_id: problemId,
          },

          select: {
            max_score: true,
            sort_order: true,
            problem: {
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
                ProblemTag: {
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
            },
          },
        },
        start_at: true,
        end_at: true,
        contest_visibility: true,
        participant_type: true,
        author_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return { success: true, data: data };
  }
}
