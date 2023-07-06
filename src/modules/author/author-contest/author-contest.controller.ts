import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorContestService } from './author-contest.service';
import { CreateAuthorContestDto } from './dto/create-author-contest.dto';
import { UpdateAuthorContestDto } from './dto/update-author-contest.dto';

@Controller('author/contest')
export class AuthorContestController {
  constructor(private readonly authorContestService: AuthorContestService) {}

  @Post()
  create(@Body() createAuthorContestDto: CreateAuthorContestDto) {
    return this.authorContestService.create(createAuthorContestDto);
  }

  @Get()
  findAll() {
    return this.authorContestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorContestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorContestDto: UpdateAuthorContestDto,
  ) {
    return this.authorContestService.update(+id, updateAuthorContestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorContestService.remove(+id);
  }
}
