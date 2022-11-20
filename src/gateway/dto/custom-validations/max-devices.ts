import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { GatewayService } from '../../services/gateway-rep/gateway.service';

@ValidatorConstraint({ name: 'GatewayMaxDevices', async: true })
@Injectable()
export class GatewayMaxDevices implements ValidatorConstraintInterface {
  constructor(private gatewayService: GatewayService) {}

  async validate(idGateWay) {
    const numberDevice = await this.gatewayService.getNumberDevice(idGateWay);
    return numberDevice <= 10;
  }

  defaultMessage(_) {
    return 'The gateway has reached the maximum number of devices, 10';
  }
}
