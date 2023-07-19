import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAuthorProblemDto } from './dto/create-author-problem.dto';
import { UpdateAuthorProblemDto } from './dto/update-author-problem.dto';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { StringHelper } from '../../../common/helper/string.helper';

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
export class AuthorProblemService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(userId: number, createAuthorProblemDto: CreateAuthorProblemDto) {
    try {
      const data = {};

      const name = createAuthorProblemDto.name;
      const tags = createAuthorProblemDto.tags;
      const statement = createAuthorProblemDto.statement;
      const time_limit = createAuthorProblemDto.time_limit;
      const memory_limit = createAuthorProblemDto.memory_limit;

      const input_format = createAuthorProblemDto.input_format;
      const output_format = createAuthorProblemDto.output_format;

      const note = createAuthorProblemDto.note;
      const difficulty = createAuthorProblemDto.difficulty;

      const sample_test_cases_input =
        createAuthorProblemDto.sample_test_cases_input;
      const sample_test_cases_output =
        createAuthorProblemDto.sample_test_cases_output;

      const system_test_cases_input =
        createAuthorProblemDto.system_test_cases_input;
      const system_test_cases_output =
        createAuthorProblemDto.system_test_cases_output;

      const sample_test_cases = getSampleTestCases(
        sample_test_cases_input,
        sample_test_cases_output,
      );

      const system_test_cases = getSampleTestCases(
        system_test_cases_input,
        system_test_cases_output,
      );

      if (name) {
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

        Object.assign(data, {
          name: name,
          slug: slug,
        });
      }

      if (statement) {
        data['statement'] = statement;
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
        if (tags) {
          await this.saveTags(result.id, tags);
        }
        return { success: true, message: 'Create problem successfully!' };
      } else {
        return { success: false, message: 'Create problem failed!' };
      }
    } catch (error) {
      // return false;
      throw error;
    }
  }

  async findAll(userId: number) {
    const data = await this.prisma.problem.findMany({
      where: {
        author_id: userId,
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
    return { success: true, data: data };
  }

  async search(query: string) {
    const data = await this.prisma.problem.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            slug: {
              contains: query,
            },
          },
        ],
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
    return { success: true, data: data };
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

    return { success: true, data: data };
  }

  async update(
    userId: number,
    id: number,
    updateAuthorProblemDto: UpdateAuthorProblemDto,
  ) {
    try {
      const data = {};

      const name = updateAuthorProblemDto.name;
      const tags = updateAuthorProblemDto.tags;
      const statement = updateAuthorProblemDto.statement;
      const time_limit = updateAuthorProblemDto.time_limit;
      const memory_limit = updateAuthorProblemDto.memory_limit;

      const input_format = updateAuthorProblemDto.input_format;
      const output_format = updateAuthorProblemDto.output_format;

      const note = updateAuthorProblemDto.note;
      const difficulty = updateAuthorProblemDto.difficulty;

      const sample_test_cases_input =
        updateAuthorProblemDto.sample_test_cases_input;
      const sample_test_cases_output =
        updateAuthorProblemDto.sample_test_cases_output;

      const system_test_cases_input =
        updateAuthorProblemDto.system_test_cases_input;
      const system_test_cases_output =
        updateAuthorProblemDto.system_test_cases_output;

      const sample_test_cases = getSampleTestCases(
        sample_test_cases_input,
        sample_test_cases_output,
      );

      const system_test_cases = getSampleTestCases(
        system_test_cases_input,
        system_test_cases_output,
      );

      if (name) {
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

      const result = await this.prisma.problem.updateMany({
        where: {
          AND: [
            {
              id: id,
            },
            {
              author_id: userId,
            },
          ],
        },
        data: {
          ...data,
        },
      });

      if (result) {
        if (tags) {
          await this.saveTags(id, tags);
        }
        return { success: true, message: 'Problem updated successfully!' };
      } else {
        return { success: false, message: 'Something went wrong' };
      }
    } catch (error) {
      throw error;
    }
  }

  async saveTags(problemId: number, tags: string[]) {
    try {
      if (tags.length > 0) {
        // remove product tags
        await this.prisma.problemTag.deleteMany({
          where: {
            problem_id: problemId,
          },
        });

        for (let i = 0; i < tags.length; i++) {
          await this.prisma.$transaction(async (prisma) => {
            const tag = tags[i];

            // check tag exist
            let checkTag = await prisma.tag.findFirst({
              where: {
                name: tag,
              },
            });

            // if not create new
            if (!checkTag) {
              checkTag = await prisma.tag.create({
                data: {
                  name: tag,
                  slug: StringHelper.slugify(tag),
                },
              });
            }

            const checkProblemTag = await prisma.problemTag.findFirst({
              where: {
                problem_id: problemId,
                tag_id: checkTag.id,
              },
            });

            if (!checkProblemTag) {
              await prisma.problemTag.create({
                data: {
                  problem_id: problemId,
                  tag_id: checkTag.id,
                },
              });
            }
          });
        }
      } else {
        // remove product tags
        await this.prisma.problemTag.deleteMany({
          where: {
            problem_id: problemId,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: number, id: number) {
    try {
      const result = await this.prisma.problem.deleteMany({
        where: {
          AND: [
            {
              id: id,
            },
            {
              author_id: userId,
            },
          ],
        },
      });

      if (result) {
        return { success: true, message: 'Problem deleted successfully!' };
      } else {
        return { success: false, message: 'Something went wrong' };
      }
    } catch (error) {
      throw error;
    }
  }
}
