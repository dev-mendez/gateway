import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { DeviceService } from '../services/device-rep/device.service';
import { CreateDeviceDTO } from '../dto/CreateDeviceDTO';
// import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async addDevice(@Body() req: CreateDeviceDTO, @Res() res) {
    try {
      const { idGateway, ...rest } = req;
      const result = await this.deviceService.addDevice(idGateway, req);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Delete('/:id')
  async removeDevice(@Param('id') id: string, @Res() res) {
    try {
      const deletedDevice = await this.deviceService.deleteDevice(<string>id);
      res
        .status(HttpStatus.OK)
        .json({ mesage: 'Device deleted!', deletedDevice });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
