import mongoose, { Schema, Document } from 'mongoose';

export interface IBike extends Document {
  model: string;
  vendorId: mongoose.Schema.Types.ObjectId;
  pricePerHour: number;
  availabilityStatus: 'available' | 'rented' | 'under_maintenance';
  location: string;
  photos: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BikeSchema: Schema = new Schema(
  {
    model: { type: String, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pricePerHour: { type: Number, required: true },
    availabilityStatus: { 
      type: String, 
      enum: ['available', 'rented', 'under_maintenance'], 
      default: 'available',
      required: true 
    },
    location: { type: String, required: true },
    photos: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Bike || mongoose.model<IBike>('Bike', BikeSchema);
