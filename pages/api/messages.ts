import { NextApiRequest, NextApiResponse } from "next";
import { deleteMessage, getMessages } from "../../lib/message-utils";

import { getSession } from "next-auth/react";

const apiMessages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Brak dostępu" });
  }

  if (req.method === "GET") {
    try {
      const messages = await getMessages();
      res.status(200).json({ messages });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      await deleteMessage(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }
};

export default apiMessages;
