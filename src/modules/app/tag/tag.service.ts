import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../../../providers/prisma/prisma.service';

@Injectable()
export class TagService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  async findAll() {
    const result = await this.prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
