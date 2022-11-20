import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GateWay } from './gateway.schema';
import mongoose from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ required: true, index: true })
  uid: number;

  @Prop({ required: true })
  vendor: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ required: true })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  idGateway: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
