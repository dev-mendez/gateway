import { GatewayMaxDevices } from './dto/custom-validations/max-devices';
import { GatewayService } from './services/gateway-rep/gateway.service';
import { GateWayIsUnique } from './dto/custom-validations/serial-number';
import { DeviceService } from './services/device-rep/device.service';
import { GatewayController } from './controllers/gateway.controller';
import { DeviceController } from './controllers/device.controller';
import { GateWaySchema } from './schemas/gateway.schema';
import { DeviceSchema } from './schemas/device.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CreateDeviceDTO } from '../gateway/dto/CreateDeviceDTO';
import { CreateGatewayDTO } from '../gateway/dto/CreateGatewayDTO';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Gateway',
        schema: GateWaySchema,
      },
      {
        name: 'Device',
        schema: DeviceSchema,
      },
    ]),
  ],
  controllers: [DeviceController, GatewayController],
  providers: [
    GatewayService,
    DeviceService,
    GatewayMaxDevices,
    GateWayIsUnique,
    CreateDeviceDTO,
    CreateGatewayDTO,
  ],
})
export class GatewayModule {}
