import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PrismaService } from '../../../providers/prisma/prisma.service';

@Injectable()
export class ProblemService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(userId, createProblemDto: CreateProblemDto) {
    try {
      const data = {};

      const name = createProblemDto.name;
      const statement = createProblemDto.statement;
      const explanation = createProblemDto.explanation;
      const constraint = createProblemDto.constraint;
      const time = createProblemDto.time;
      const memory = createProblemDto.memory;

      if (name) {
        Object.assign(data, {
          name: name,
        });
      }
      if (statement) {
        Object.assign(data, {
          statement: statement,
        });
      }
      if (explanation) {
        Object.assign(data, {
          explanation: explanation,
        });
      }
      if (constraint) {
        Object.assign(data, {
          constraint: constraint,
        });
      }
      if (time) {
        Object.assign(data, {
          time: time,
        });
      }
      if (memory) {
        Object.assign(data, {
          memory: memory,
        });
      }

      const result = await this.prisma.problem.create({
        data: {
          ...data,
          author_id: userId,
        },
      });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
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
    });

    return data;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
