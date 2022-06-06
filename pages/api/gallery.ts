import { NextApiRequest, NextApiResponse } from "next";
import { deleteImage, getImages, setImage } from "../../lib/gallery-utils";

const apiGallery = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const gallery = await getImages();
      res.status(200).json({ gallery });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "PATCH") {
    try {
      const { extension } = req.body;
      const uploadData = await setImage(extension);

      res.status(200).json({ ...uploadData });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await deleteImage(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }
};

export default apiGallery;
