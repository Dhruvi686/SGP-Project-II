import mongoose, { Schema, Document } from 'mongoose';

export interface IPermit extends Document {
  touristId: mongoose.Schema.Types.ObjectId;
  destination: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  documentUrl: string;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PermitSchema: Schema = new Schema(
  {
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending',
      required: true 
    },
    documentUrl: { type: String, required: true },
    reason: { type: String }, // For rejection reason or approval notes
  },
  { timestamps: true }
);

export default mongoose.models.Permit || mongoose.model<IPermit>('Permit', PermitSchema);
