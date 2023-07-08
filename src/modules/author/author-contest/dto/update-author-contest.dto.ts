import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthorContestDto } from './create-author-contest.dto';

export class UpdateAuthorContestDto extends PartialType(
  CreateAuthorContestDto,
) {
  @ApiProperty()
  description?: string;

  @ApiProperty()
  contest_type?: string;

  @ApiProperty()
  password?: string;
}
