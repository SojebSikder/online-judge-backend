import { ApiProperty } from '@nestjs/swagger';

export class AddAuthorContestProblemDto {
  @ApiProperty()
  problem_id?: number;

  @ApiProperty()
  max_score?: number;

  @ApiProperty()
  sort_order?: string;
}
