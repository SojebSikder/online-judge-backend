import { PartialType } from '@nestjs/swagger';
import { CreateAuthorContestDto } from './create-author-contest.dto';

export class UpdateAuthorContestDto extends PartialType(CreateAuthorContestDto) {}
