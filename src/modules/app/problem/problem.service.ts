import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { StringHelper } from 'src/common/helper/string.helper';

function getSampleTestCases(
  sample_test_cases_input: string,
  sample_test_cases_output: string,
): any[] {
  const sample_test_cases = [];

  if (sample_test_cases_input && sample_test_cases_output) {
    const split_input = sample_test_cases_input.split('\n');
    const split_output = sample_test_cases_output.split('\n');

    for (let i = 0; i < split_input.length; i++) {
      sample_test_cases.push({
        input: split_input[i],
        output: split_output[i],
      });
    }
  }

  return sample_test_cases;
}
@Injectable()
export class ProblemService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(userId: number, createProblemDto: CreateProblemDto) {
    try {
      const data = {};

      const name = createProblemDto.name;
      const statement = createProblemDto.statement;
      const time_limit = createProblemDto.time_limit;
      const memory_limit = createProblemDto.memory_limit;

      const input_format = createProblemDto.input_format;
      const output_format = createProblemDto.output_format;

      const note = createProblemDto.note;
      const difficulty = createProblemDto.difficulty;

      const sample_test_cases_input = createProblemDto.sample_test_cases_input;
      const sample_test_cases_output =
        createProblemDto.sample_test_cases_output;

      const system_test_cases_input = createProblemDto.system_test_cases_input;
      const system_test_cases_output =
        createProblemDto.system_test_cases_output;

      const sample_test_cases = getSampleTestCases(
        sample_test_cases_input,
        sample_test_cases_output,
      );

      const system_test_cases = getSampleTestCases(
        system_test_cases_input,
        system_test_cases_output,
      );

      // create slug
      let slug = StringHelper.slugify(name);

      const checkProblem = await this.prisma.problem.findFirst({
        where: {
          slug: slug,
        },
      });

      if (checkProblem) {
        slug = slug + '-' + StringHelper.randomString(5);
      }

      if (name) {
        Object.assign(data, {
          name: name,
          slug: slug,
        });
      }

      if (statement) {
        Object.assign(data, {
          statement: statement,
        });
      }

      if (time_limit) {
        Object.assign(data, {
          time_limit: Number(time_limit),
        });
      }
      if (memory_limit) {
        Object.assign(data, {
          memory_limit: Number(memory_limit),
        });
      }

      if (input_format) {
        Object.assign(data, {
          input_format: input_format,
        });
      }
      if (output_format) {
        Object.assign(data, {
          output_format: output_format,
        });
      }
      if (note) {
        Object.assign(data, {
          note: note,
        });
      }
      if (difficulty) {
        Object.assign(data, {
          difficulty: difficulty,
        });
      }

      if (sample_test_cases) {
        Object.assign(data, {
          sample_test_cases: sample_test_cases,
        });
      }
      if (system_test_cases) {
        Object.assign(data, {
          system_test_cases: system_test_cases,
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
      // return false;
      throw error;
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
