import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';
import { CheckAbilities } from '../../../providers/ability/abilities.decorator';
import { Action } from '../../../providers/ability/ability.factory';

@ApiBearerAuth()
@ApiTags('problem')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @ApiOperation({ summary: 'Create problem' })
  // @CheckAbilities({ action: Action.Create, subject: 'Problem' })
  @Post()
  async create(@Req() req, @Body() createProblemDto: CreateProblemDto) {
    const userId = req.user.userId;
    const result = await this.problemService.create(userId, createProblemDto);

    if (result) {
      return { message: 'Problem created successfully' };
    } else {
      return { message: 'Something went wrong' };
    }
  }

  @ApiOperation({ summary: 'Read problems' })
  // @CheckAbilities({ action: Action.Read, subject: 'Problem' })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId;
    const me = req.query.me;

    const result = await this.problemService.findAll(userId, me);
    return { data: result };
  }

  @ApiOperation({ summary: 'Show problem' })
  // @CheckAbilities({ action: Action.Show, subject: 'Problem' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.problemService.findOne(+id);

    return { data: result };
  }

  @ApiOperation({ summary: 'Update problem' })
  // @CheckAbilities({ action: Action.Update, subject: 'Problem' })
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    const userId = req.user.userId;

    const result = await this.problemService.update(
      userId,
      +id,
      updateProblemDto,
    );

    if (result) {
      return { message: 'Updated successfully' };
    } else {
      return { message: 'Something went wrong' };
    }
  }

  @ApiOperation({ summary: 'Delete problem' })
  // @CheckAbilities({ action: Action.Delete, subject: 'Problem' })
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;

    const result = this.problemService.remove(userId, +id);

    if (result) {
      return { message: 'Deleted successfully' };
    } else {
      return { message: 'Something went wrong' };
    }
  }
}
