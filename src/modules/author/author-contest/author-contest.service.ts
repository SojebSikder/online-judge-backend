import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAuthorContestDto } from './dto/create-author-contest.dto';
import { UpdateAuthorContestDto } from './dto/update-author-contest.dto';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { StringHelper } from '../../../common/helper/string.helper';

@Injectable()
export class AuthorContestService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  async create(userId: number, createAuthorContestDto: CreateAuthorContestDto) {
    try {
      const data = {};

      const name = createAuthorContestDto.name;
      let slug = createAuthorContestDto.slug;
      const description = createAuthorContestDto.description;
      const start_at = createAuthorContestDto.start_at;
      const end_at = createAuthorContestDto.end_at;
      const contest_type = createAuthorContestDto.contest_type;
      const participant_type = createAuthorContestDto.participant_type;

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

  async findAll(userId: number) {
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

  async update(
    userId: number,
    id: number,
    updateAuthorContestDto: UpdateAuthorContestDto,
  ) {
    try {
      const data = {};

      const name = updateAuthorContestDto.name;
      let slug = updateAuthorContestDto.slug;
      const description = updateAuthorContestDto.description;
      const start_at = updateAuthorContestDto.start_at;
      const end_at = updateAuthorContestDto.end_at;
      const contest_type = updateAuthorContestDto.contest_type;
      const participant_type = updateAuthorContestDto.participant_type;

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
