import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'update_at' } })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop()
  password: string;

  @Prop([String])
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
