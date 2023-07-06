import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';

@ApiBearerAuth()
@ApiTags('problem')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @ApiOperation({ summary: 'Read problems' })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId;

    const result = await this.problemService.findAll();
    return { data: result };
  }

  @ApiOperation({ summary: 'Show problem' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.problemService.findOne(+id);

    return { data: result };
  }
}
