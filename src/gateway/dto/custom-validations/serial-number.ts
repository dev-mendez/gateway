import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { GatewayService } from '../../services/gateway-rep/gateway.service';

@ValidatorConstraint({ name: 'GateWayIsUnique', async: true })
@Injectable()
export class GateWayIsUnique implements ValidatorConstraintInterface {
  constructor(private gatewayService: GatewayService) {}

  async validate(serialNumber: number) {
    const result = await this.gatewayService.findBySN(serialNumber);
    return result === null;
  }

  defaultMessage(_) {
    return `The serial number must be unique!`;
  }
}
