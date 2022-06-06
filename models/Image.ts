import { Model, Schema, model, models } from "mongoose";

interface IImage {
  url: string;
  date: Date;
}

const imageSchema: Schema = new Schema<IImage>({
  url: { type: String, required: true },
  date: { type: Date, default: new Date() },
});

const Image = (models?.Image as Model<IImage>) || model<IImage>("Image", imageSchema);
export default Image;
