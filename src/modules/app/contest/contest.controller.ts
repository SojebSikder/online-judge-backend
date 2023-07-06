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

  @Get()
  findAll() {
    return this.contestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestService.findOne(+id);
  }

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

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    const result = this.contestService.remove(userId, +id);

    return result;
  }
}
