import { NextApiRequest, NextApiResponse } from "next";
import { deleteReview, getReviews } from "../../lib/review-utils";

import Review from "../../models/Review";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";

const apiReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      const reviews = await getReviews(!!session);
      res.status(200).json({ reviews });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "POST") {
    const { name, text } = req.body;

    try {
      await dbConnect();
      const review = new Review({ date: new Date(), name, text });
      await review.save();
      res.status(201).json({ review: { id: review.id, name: review.name, text: review.text, date: review.date } });
    } catch (error) {
      return res.status(500).json({ message: "Błąd podczas dodawania wpisu" });
    }
  }

  if (req.method === "PATCH") {
    const { id } = req.body;

    try {
      await dbConnect();
      await Review.findByIdAndUpdate(id, { accepted: true });
    } catch (error) {
      return res.status(500).json({ message: "Błąd podczas akceptowania wpisu" });
    }

    res.status(201).json({ message: "Wpis został zaakceptowany" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      await deleteReview(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }
};

export default apiReviews;
