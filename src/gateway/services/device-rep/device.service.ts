import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeviceDTO } from '../../dto/CreateDeviceDTO';

import { Gateway } from '../../interfaces/gateway.interface';
import { Device } from '../../interfaces/device.interface';

@Injectable()
export class DeviceService {
  private readonly logger = new Logger(DeviceService.name);

  constructor(
    @InjectModel('Gateway') private readonly gatewayModel: Model<Gateway>,
    @InjectModel('Device') private readonly deviceModel: Model<Device>,
  ) {}

  async addDevice(
    idGateWay: string,
    deviceData: CreateDeviceDTO,
  ): Promise<Device> {
    const newDevice = new this.deviceModel(deviceData);
    const savedDevice = await newDevice.save();
    await this.gatewayModel.findOneAndUpdate(
      { _id: idGateWay },
      { $push: { devices: savedDevice } },
    );
    return savedDevice;
  }

  async deleteDevice(idDevice: string): Promise<Device> {
    try {
      const device = await this.deviceModel.findById(idDevice);
      const deletedDevice = await device.remove();
      return deletedDevice;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
