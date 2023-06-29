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
    const user = req.user;
    const result = await this.problemService.create(
      user.userId,
      createProblemDto,
    );

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
    const user = req.user;

    const result = await this.problemService.findAll();
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
  @CheckAbilities({ action: Action.Update, subject: 'Problem' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemService.update(+id, updateProblemDto);
  }

  @ApiOperation({ summary: 'Delete problem' })
  @CheckAbilities({ action: Action.Delete, subject: 'Problem' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemService.remove(+id);
  }
}
