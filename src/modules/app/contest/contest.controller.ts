import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';

@ApiBearerAuth()
@ApiTags('contest')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @ApiOperation({ summary: 'Read contests' })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId;

    const result = await this.contestService.findAll();

    return result;
  }

  @ApiOperation({ summary: 'Show contest' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.contestService.findOne(+id);

    return result;
  }
}
