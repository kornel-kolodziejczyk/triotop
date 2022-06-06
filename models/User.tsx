import { Model, Schema, model, models } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = (models?.User as Model<IUser>) || model<IUser>("User", userSchema);
export default User;
