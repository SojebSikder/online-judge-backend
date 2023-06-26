import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JudgeService } from './judge.service';
import { CreateJudgeDto } from './dto/create-judge.dto';
import { UpdateJudgeDto } from './dto/update-judge.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';

@ApiBearerAuth()
@ApiTags('judge')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @ApiOperation({ summary: 'Code run' })
  @Post()
  async run(@Body() createJudgeDto: CreateJudgeDto) {
    const result = await this.judgeService.run(createJudgeDto);
    return result;
  }

  @ApiOperation({ summary: 'Code submission' })
  @Post()
  async create(@Body() createJudgeDto: CreateJudgeDto) {
    const result = await this.judgeService.create(createJudgeDto);
    return result;
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
