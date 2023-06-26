import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JudgeService } from './judge.service';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';

@Controller('judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Post()
  async create(@Body() createJudgeDto: CreateJudgeDto) {
    return await this.judgeService.create(createJudgeDto);
  }

  @Get()
  findAll() {
    return this.judgeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.judgeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJudgeDto: UpdateJudgeDto) {
    return this.judgeService.update(+id, updateJudgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.judgeService.remove(+id);
  }
}
