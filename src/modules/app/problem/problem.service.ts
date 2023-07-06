import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../providers/prisma/prisma.service';

@Injectable()
export class ProblemService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAll() {
    const data = await this.prisma.problem.findMany();
    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.problem.findFirst({
      where: {
        id: id,
      },
      include: {
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
    });

    return data;
  }
}
