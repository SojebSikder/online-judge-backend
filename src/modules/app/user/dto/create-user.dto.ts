import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  fname?: string;

  @ApiProperty()
  lname?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  date_of_birth?: string;
  @ApiProperty()
  country?: string;
  @ApiProperty()
  city?: string;
  @ApiProperty()
  organization?: string;

  // address
  @ApiProperty()
  recipient_name?: string;
  @ApiProperty()
  recipient_zip_code?: string;
  @ApiProperty()
  recipient_country?: string;
  @ApiProperty()
  recipient_state?: string;
  @ApiProperty()
  recipient_city?: string;
  @ApiProperty()
  recipient_address?: string;
  @ApiProperty()
  recipient_phone_number?: string;
}
