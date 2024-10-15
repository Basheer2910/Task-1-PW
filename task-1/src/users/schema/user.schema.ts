/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";
export type UserDocument = User & Document;

@Schema()
export class User {
   @Prop()
   name: string;
   @Prop()
   phone: number;
   @Prop()
   id: number;
   @Prop()
   status : string;
}

export const UserSchema = SchemaFactory.createForClass(User);