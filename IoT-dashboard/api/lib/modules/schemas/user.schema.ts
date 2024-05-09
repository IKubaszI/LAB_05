import { Schema, model } from 'mongoose';
import {IUser} from "../models/user.model";

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // zmiana z admin na user
    active: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false } // zmiana na false
});

export default model<IUser>('User', UserSchema)