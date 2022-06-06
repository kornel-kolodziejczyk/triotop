import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, verifyPassword } from "../../lib/auth";

import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";

const apiProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "PATCH") {

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Brak dostępu" });
    }

    const { currentPassword, newPassword } = req.body;

    try {
      await dbConnect();
      const user = await User.findById(session.user.id);

      if (!user) {
        return res.status(404).json({ message: "Nie znaleziono użytkownika" });
      }

      const passwordsAreEqual = await verifyPassword(currentPassword, user.password);

      if (!passwordsAreEqual) {
        return res.status(403).json({ message: "Niepoprawne hasło" });
      }

      if (newPassword) {
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
      }

      await user.save();
      res.status(200).json({ message: "Hasło zostało zmienione" });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};

export default apiProfile;
