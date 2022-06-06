import { Model, Schema, model, models } from "mongoose";

interface IAudio {
  url: string;
  date: Date;
  title: string;
}

const audioSchema: Schema = new Schema<IAudio>({
  url: { type: String, required: true },
  date: { type: Date, default: new Date() },
  title: { type: String, required: true },
});

const Audio = (models?.Audio as Model<IAudio>) || model<IAudio>("Audio", audioSchema);
export default Audio;
