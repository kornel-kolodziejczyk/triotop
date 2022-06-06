import { Model, Schema, model, models } from "mongoose";

interface IMessage {
  date: Date;
  email: string;
  name: string;
  text: string;
}

const messageSchema: Schema = new Schema({
  date: { type: Date, default: new Date() },
  email: { type: String, required: true},
  name: { type: String, required: true },
  text: { type: String, required: true },
});

const Message = (models?.Message as Model<IMessage>) || model<IMessage>("Message", messageSchema);
export default Message;
