import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Tourist' | 'Vendor' | 'Government';
  businessName?: string;
  contactNumber?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['Tourist', 'Vendor', 'Government'],
      default: 'Tourist'
    },
    businessName: { type: String },
    contactNumber: { type: String },
    address: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);