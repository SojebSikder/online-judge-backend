import { Injectable } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { StringHelper } from '../../../common/helper/string.helper';

@Injectable()
export class ContestService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  async create(userId: number, createContestDto: CreateContestDto) {
    try {
      const data = {};

      const name = createContestDto.name;
      let slug = createContestDto.slug;
      const description = createContestDto.description;
      const start_at = createContestDto.start_at;
      const end_at = createContestDto.end_at;
      const contest_type = createContestDto.contest_type;
      const participant_type = createContestDto.participant_type;

      if (name) {
        if (!slug) {
          // create slug
          slug = StringHelper.slugify(name);
        }

        const checkContest = await this.prisma.contest.findFirst({
          where: {
            slug: slug,
          },
        });

        if (checkContest) {
          slug = slug + '-' + StringHelper.randomString(5);
        }
        data['name'] = name;
        data['slug'] = slug;
      }

      if (description) {
        data['description'] = description;
      }
      if (start_at) {
        data['start_at'] = start_at;
      }
      if (end_at) {
        data['end_at'] = end_at;
      }
      if (contest_type) {
        data['contest_type'] = contest_type;
      }
      if (participant_type) {
        data['participant_type'] = participant_type;
      }

      const result = await this.prisma.contest.create({
        data: {
          ...data,
          author_id: userId,
        },
      });

      if (result) {
        return {
          success: true,
          message: 'Contest created successfully',
        };
      } else {
        return {
          success: false,
          message: 'Contest creataion failed',
        };
      }
    } catch (error) {
      // return false;
      throw error;
    }
  }

  async findAll(userId: number, me: number) {
    if (me) {
      const data = await this.prisma.contest.findMany({
        where: {
          author_id: userId,
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
    } else {
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

  async update(userId: number, id: number, updateContestDto: UpdateContestDto) {
    try {
      const data = {};

      const name = updateContestDto.name;
      let slug = updateContestDto.slug;
      const description = updateContestDto.description;
      const start_at = updateContestDto.start_at;
      const end_at = updateContestDto.end_at;
      const contest_type = updateContestDto.contest_type;
      const participant_type = updateContestDto.participant_type;

      if (name) {
        if (!slug) {
          // create slug
          slug = StringHelper.slugify(name);
        }

        const checkContest = await this.prisma.contest.findFirst({
          where: {
            slug: slug,
          },
        });

        if (checkContest) {
          slug = slug + '-' + StringHelper.randomString(5);
        }
        data['name'] = name;
        data['slug'] = slug;
      }

      if (description) {
        data['description'] = description;
      }
      if (start_at) {
        data['start_at'] = start_at;
      }
      if (end_at) {
        data['end_at'] = end_at;
      }
      if (contest_type) {
        data['contest_type'] = contest_type;
      }
      if (participant_type) {
        data['participant_type'] = participant_type;
      }

      const result = await this.prisma.contest.updateMany({
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
        return {
          success: true,
          message: 'Contest updated successfully',
        };
      } else {
        return {
          success: false,
          message: 'Contest updating failed',
        };
      }
    } catch (error) {
      // return false;
      throw error;
    }
  }

  async remove(userId: number, id: number) {
    try {
      const result = await this.prisma.contest.deleteMany({
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
        return {
          success: true,
          message: 'Contest deleted successfully',
        };
      } else {
        return {
          success: false,
          message: 'Contest deleting failed',
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
