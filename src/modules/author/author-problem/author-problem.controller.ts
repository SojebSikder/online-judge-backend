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
import { AuthorProblemService } from './author-problem.service';
import { CreateAuthorProblemDto } from './dto/create-author-problem.dto';
import { UpdateAuthorProblemDto } from './dto/update-author-problem.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';

@ApiBearerAuth()
@ApiTags('Author problem')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('author/problem')
export class AuthorProblemController {
  constructor(private readonly authorProblemService: AuthorProblemService) {}

  @ApiOperation({ summary: 'Create problem' })
  @Post()
  async create(
    @Req() req,
    @Body() createAuthorProblemDto: CreateAuthorProblemDto,
  ) {
    const userId = req.user.userId;
    const result = this.authorProblemService.create(
      userId,
      createAuthorProblemDto,
    );

    return result;
  }

  @ApiOperation({ summary: 'Read problems' })
  // @CheckAbilities({ action: Action.Read, subject: 'Problem' })
  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId;
    const result = await this.authorProblemService.findAll(userId);

    return result;
  }

  @ApiOperation({ summary: 'Show problem' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.authorProblemService.findOne(+id);

    return result;
  }

  @ApiOperation({ summary: 'Update problem' })
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateAuthorProblemDto: UpdateAuthorProblemDto,
  ) {
    const userId = req.user.userId;
    const result = await this.authorProblemService.update(
      userId,
      +id,
      updateAuthorProblemDto,
    );

    return result;
  }

  @ApiOperation({ summary: 'Delete problem' })
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;

    const result = await this.authorProblemService.remove(userId, +id);

    return result;
  }
}
