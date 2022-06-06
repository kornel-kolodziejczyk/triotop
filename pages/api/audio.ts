import { NextApiRequest, NextApiResponse } from "next";
import { deleteAudio, getAudios, setAudio } from "../../lib/audio-utils";

const apiAudio = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const audios = await getAudios();
      res.status(200).json({ audios });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "PATCH") {
    try {
      const { extension, title } = req.body;
      const uploadData = await setAudio(extension, title);

      res.status(200).json({ ...uploadData });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await deleteAudio(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

};

export default apiAudio;
