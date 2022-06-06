import { IReview } from "../interfaces/review";
import Review from "../models/Review";
import dbConnect from "./dbConnect";

export const getReviews = async (admin: boolean): Promise<IReview[]> => {
  try {
    await dbConnect();

    const reviews = await Review.find({ ...(!admin && { accepted: true }) })
      .sort({ date: -1 })
      .lean();

    return reviews.map((review) => ({ ...review, id: review._id.toString() }));
  } catch (error) {
    throw new Error("Błąd podczas wczytywania wpisów z księgi gości");
  }
};

export const deleteReview = async (id: string) => {
  try {
    await dbConnect();
    await Review.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Błąd podczas usuwania wpisu z księgi gości");
  }
};
