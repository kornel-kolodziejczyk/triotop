import { Model, Schema, model, models } from "mongoose";

interface IReview {
  accepted: boolean;
  date: Date;
  name: string;
  text: string;
}

const reviewSchema: Schema = new Schema({
  accepted: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
  name: { type: String, required: true },
  text: { type: String, required: true },
});

const Review = (models?.Review as Model<IReview>) || model<IReview>("Review", reviewSchema);
export default Review;
