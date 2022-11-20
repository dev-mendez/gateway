import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DeviceDocument } from './device.schema';
import mongoose from 'mongoose';

export type GateWayDocument = GateWay & Document;

@Schema()
export class GateWay {
  @Prop()
  serialNumber: string;

  @Prop()
  name: string;

  @Prop()
  ipV4: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }])
  devices: [];
}

export const GateWaySchema = SchemaFactory.createForClass(GateWay);
