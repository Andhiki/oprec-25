import mongoose, { Schema } from 'mongoose';
import { IUser } from '@/types/IUser';
import bcrypt from 'bcryptjs';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nimRegex = /^\d{2}\/\d{6}\/[A-Z]{2}\/\d{5}$/;

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [emailRegex, 'Please fill a valid email address'],
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      NIM: {
        type: String,
        required: true,
        unique: true,
        match: [nimRegex, 'Please fill a valid NIM'],
      },
      password: {
        type: String,
        required: true,
      },
      divisiPilihan: [
        {
          divisiId: {
              type: Schema.Types.ObjectId,
              ref: 'Divisi',
              required: true
          },
          urutanPrioritas: {
              type: Number,
              min: 1,
              max: 4,
              required: true
          }
        }
      ],
      divisiPilihanOti: [{
        type: Schema.Types.ObjectId,
        ref: 'Divisi',
      }],
      divisiPilihanHima: [{
        type: Schema.Types.ObjectId,
        ref: 'Divisi',
      }],
      resetToken: {
        type: String,
      },
      resetTokenExpiration: {
        type: Date,
      },
      tanggalPilihanHima: {
        tanggalId: {
          type: Schema.Types.ObjectId,
          ref: 'Wawancara'
        }
      },
      tanggalPilihanOti: {
        tanggalId: {
          type: Schema.Types.ObjectId,
          ref: 'Wawancara'
        },
      },
      prioritasOti:{
        type: Schema.Types.ObjectId,
        ref: 'Divisi'
      },
      prioritasHima:{
        type: Schema.Types.ObjectId,
        ref: 'Divisi'
      },
      tugas: [{
        type: Schema.Types.ObjectId,
        ref: 'Penugasan'
      }],
      diterimaDi: {
        type: Schema.Types.ObjectId,
        ref: 'Divisi'
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      accessToken: {
        type: String
      },
      refreshToken: {
        type: String
      },
      enrolledSlugHima: {
        type: String
      },
      enrolledSlugOti: {
        type: String
      }
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if(this.NIM !== process.env.ADMIN_NIM){
    this.isAdmin = false;
  }
  next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;