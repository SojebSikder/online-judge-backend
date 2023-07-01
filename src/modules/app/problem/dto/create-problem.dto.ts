import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  tags?: string[];

  @ApiProperty()
  statement: string;

  @ApiProperty()
  time_limit?: number;

  @ApiProperty()
  memory_limit?: number;

  @ApiProperty()
  input_format?: string;

  @ApiProperty()
  output_format?: string;

  @ApiProperty()
  note?: string;

  @ApiProperty()
  difficulty?: string;

  @ApiProperty()
  sample_test_cases_input?: string;
  @ApiProperty()
  sample_test_cases_output?: string;

  @ApiProperty()
  system_test_cases_input?: string;
  @ApiProperty()
  system_test_cases_output?: string;
}
