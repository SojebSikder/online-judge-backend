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
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';

@ApiBearerAuth()
@ApiTags('submission')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionService.create(createSubmissionDto);
  }

  @ApiOperation({ summary: 'Read problems' })
  @Get()
  async findAll(@Req() req: Request) {
    const userId = req.user.userId;

    const result = await this.submissionService.findAll(userId);
    return { data: result };
  }

  @ApiOperation({ summary: 'Show problem' })
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user.userId;
    const result = await this.submissionService.findOne(userId, +id);

    if (result) {
      return { data: result };
    } else {
      return { message: 'Not found' };
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ) {
    return this.submissionService.update(+id, updateSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionService.remove(+id);
  }
}
