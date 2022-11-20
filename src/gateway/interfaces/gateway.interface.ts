import { Document } from 'mongoose';
import { CreateDeviceDTO } from '../dto/CreateDeviceDTO';

export interface Gateway extends Document {
  readonly serialNumber: string;
  readonly name: string;
  readonly ipV4: string;
  readonly devices: Array<CreateDeviceDTO>;
}
