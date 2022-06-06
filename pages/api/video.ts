import { NextApiRequest, NextApiResponse } from "next";
import { deleteVideo, getVideos, setVideo } from "../../lib/video-utils";

const apiVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const videos = await getVideos();
      res.status(200).json({ videos });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "PUT") {
    try {
      const { url } = req.body;
      const video = await setVideo(url);

      res.status(200).json({ ...video });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await deleteVideo(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }
};

export default apiVideo;
