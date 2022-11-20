import { Document } from 'mongoose';

export interface Device extends Document {
  readonly uid: number;
  readonly vendor: string;
  readonly createAt: Date;
  readonly status: string;
  readonly idGateway: string;
}
