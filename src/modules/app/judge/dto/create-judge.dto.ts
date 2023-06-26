import { ApiProperty } from '@nestjs/swagger';

export class CreateJudgeDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  problem_id: number;
}
