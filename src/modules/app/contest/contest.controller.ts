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
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from 'src/providers/ability/abilities.guard';

@ApiBearerAuth()
@ApiTags('contest')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @ApiOperation({ summary: 'Create contest' })
  @Post()
  async create(@Req() req, @Body() createContestDto: CreateContestDto) {
    const userId = req.user.userId;
    const result = await this.contestService.create(userId, createContestDto);

    return result;
  }

  @ApiOperation({ summary: 'Read contests' })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId;
    const me = req.query.me;

    const result = await this.contestService.findAll(userId, me);

    return result;
  }

  @ApiOperation({ summary: 'Show contest' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.contestService.findOne(+id);

    return result;
  }

  @ApiOperation({ summary: 'Update contest' })
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateContestDto: UpdateContestDto,
  ) {
    const userId = req.user.userId;
    const result = this.contestService.update(userId, +id, updateContestDto);

    return result;
  }

  @ApiOperation({ summary: 'Delete contest' })
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    const result = this.contestService.remove(userId, +id);

    return result;
  }
}
