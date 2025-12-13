import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  touristId: mongoose.Schema.Types.ObjectId;
  bikeId: mongoose.Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
      default: 'pending',
      required: true 
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
