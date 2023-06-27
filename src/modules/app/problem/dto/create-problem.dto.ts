import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  statement: string;

  @ApiProperty()
  explanation?: string;

  @ApiProperty()
  constraint?: string;

  @ApiProperty()
  time?: number;

  @ApiProperty()
  memory?: number;

  @ApiProperty()
  sample_test_cases?: string;
  @ApiProperty()
  system_test_cases?: string;
}
