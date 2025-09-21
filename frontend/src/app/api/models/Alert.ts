import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  message: string;
  geographicalArea: string;
  severity: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AlertSchema: Schema = new Schema(
  {
    message: { type: String, required: true },
    geographicalArea: { type: String, required: true },
    severity: { 
      type: String, 
      enum: ['low', 'medium', 'high'], 
      default: 'medium',
      required: true 
    },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);
