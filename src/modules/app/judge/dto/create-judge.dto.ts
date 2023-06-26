import { ApiProperty } from '@nestjs/swagger';

export class CreateJudgeDto {
  @ApiProperty()
  code: string;
  @ApiProperty()
  language: string;
}
