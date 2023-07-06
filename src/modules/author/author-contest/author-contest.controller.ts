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
import { AuthorContestService } from './author-contest.service';
import { CreateAuthorContestDto } from './dto/create-author-contest.dto';
import { UpdateAuthorContestDto } from './dto/update-author-contest.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';
import { AddAuthorContestProblemDto } from './dto/add-author-contest-problem.dto';

@ApiBearerAuth()
@ApiTags('author contest')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('author/contest')
export class AuthorContestController {
  constructor(private readonly authorContestService: AuthorContestService) {}

  @ApiOperation({ summary: 'Create contest' })
  @Post()
  async create(
    @Req() req,
    @Body() createAuthorContestDto: CreateAuthorContestDto,
  ) {
    const userId = req.user.userId;
    const result = await this.authorContestService.create(
      userId,
      createAuthorContestDto,
    );

    return result;
  }

  @ApiOperation({ summary: 'Add problem to the contest' })
  @Post(':id/problem')
  async addProblem(
    @Req() req,
    @Param('id') id: number,
    @Body() addAuthorContestProblemDto: AddAuthorContestProblemDto,
  ) {
    const userId = req.user.userId;
    const contestId = +id;

    const result = await this.authorContestService.addProblem({
      userId,
      contestId,
      addAuthorContestProblemDto,
    });

    return result;
  }

  @ApiOperation({ summary: 'Read contests' })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId;
    const result = await this.authorContestService.findAll(userId);

    return result;
  }

  @ApiOperation({ summary: 'Show contest' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.authorContestService.findOne(+id);

    return result;
  }

  @ApiOperation({ summary: 'Update contest' })
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateAuthorContestDto: UpdateAuthorContestDto,
  ) {
    const userId = req.user.userId;
    const result = await this.authorContestService.update(
      userId,
      +id,
      updateAuthorContestDto,
    );

    return result;
  }

  @ApiOperation({ summary: 'Delete contest' })
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    const result = await this.authorContestService.remove(userId, +id);

    return result;
  }
}
