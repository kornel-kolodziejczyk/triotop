import { IVideo } from "../interfaces/video";
import S3 from "aws-sdk/clients/s3";
import Video from "../models/Video";
import dbConnect from "./dbConnect";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.s3_accessKeyId,
  secretAccessKey: process.env.s3_sercetAccessKey,
});

export const getVideos = async (): Promise<IVideo[]> => {
  try {
    await dbConnect();
    const videos = await Video.find().sort({ date: -1 });
    return videos.map((video) => ({ id: video.id, url: video.url }));
  } catch (error) {
    throw new Error("Błąd podczas wczytywania filmów");
  }
};

export const setVideo = async (url: string): Promise<IVideo> => {
  try {
    await dbConnect();
    const video = new Video({ url });
    await video.save();
    return { id: video.id, url };
  } catch (error) {
    throw new Error("Błąd podczas zapisywania filmu");
  }
};

export const deleteVideo = async (id: string) => {
  try {
    await dbConnect();
    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      throw new Error("Brak filmu");
    }
  } catch (error) {
    throw new Error("Błąd podczas usuwania nagrania");
  }
};
