import { Model, Schema, model, models } from "mongoose";

interface IVideo {
  url: string;
  date: Date;
}

const videoSchema: Schema = new Schema<IVideo>({
  url: { type: String, required: true },
  date: { type: Date, default: new Date() },
});

const Video = (models?.Video as Model<IVideo>) || model<IVideo>("Video", videoSchema);
export default Video;
