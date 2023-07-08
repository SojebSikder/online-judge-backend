import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorContestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  start_at?: string;

  @ApiProperty()
  end_at?: string;

  @ApiProperty()
  participant_type?: string;
}
