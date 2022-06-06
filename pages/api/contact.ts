import { NextApiRequest, NextApiResponse } from "next";

import Message from "../../models/Message";
import dbConnect from "../../lib/dbConnect";

const apiContact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email || !email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      return res.status(422).json({ message: "Niepoprawne dane" });
    }

    try {
      await dbConnect();
      const message = new Message({ date: new Date(), email, name, text });
      await message.save();
    } catch (error) {
      return res.status(500).json({ message: "Błąd podczas wysyłania wiadomości" });
    }

    res.status(201).json({ message: "Wiadomość została wysłana" });
  }
};

export default apiContact;
