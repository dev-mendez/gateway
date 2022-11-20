import { GateWayIsUnique } from './custom-validations/serial-number';
import { IsNotEmpty, Matches, Validate } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class CreateGatewayDTO {
  // @ApiProperty()
  @IsNotEmpty()
  @Validate(GateWayIsUnique)
  serialNumber: string;

  // @ApiProperty()
  @IsNotEmpty()
  name: string;

  // @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    {
      message: 'You must provide a valid IPV4 address',
    },
  )
  ipV4: string;
}
