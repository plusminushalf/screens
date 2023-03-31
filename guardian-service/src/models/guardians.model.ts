import { Guardian } from '@/interfaces/guardians.interface';
import { model, Schema, Document } from 'mongoose';

const guardianSchema: Schema = new Schema({
  safeAddress: {
    type: String,
    required: true,
    unique: true,
  },
  chainId: {
    type: String,
    required: true,
  },
  guardianPublicAddress: {
    type: String,
    required: true,
  },
  guardianPrivateKey: {
    type: String,
    required: true,
  },
});

const guardianModel = model<Guardian & Document>('Guardian', guardianSchema);

export default guardianModel;
