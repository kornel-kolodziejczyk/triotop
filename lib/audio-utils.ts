import Audio from "../models/Audio";
import { IAudio } from "../interfaces/audio";
import S3 from "aws-sdk/clients/s3";
import dbConnect from "./dbConnect";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.s3_accessKeyId,
  secretAccessKey: process.env.s3_sercetAccessKey,
});

export const getAudios = async (): Promise<IAudio[]> => {
  try {
    await dbConnect();
    const audios = await Audio.find().sort({ date: -1 });
    return audios.map((audio) => ({ id: audio.id, url: audio.url, title: audio.title }));
  } catch (error) {
    throw new Error("Błąd podczas wczytywania nagrań");
  }
};

export const setAudio = async (extension: string, title: string): Promise<IAudio> => {
  try {
    await dbConnect();
    const audio = new Audio({ url: `${uuidv4()}.${extension}`, date: new Date(), title });
    await audio.save();
    const url = await s3.getSignedUrlPromise("putObject", { Bucket: "triotop", Key: audio.url, ACL: "public-read" });

    return { id: audio.id, url, title };
  } catch (error) {
    throw new Error("Błąd podczas zapisywania nagrania");
  }
};

export const deleteAudio = async (id: string) => {
  try {
    await dbConnect();
    const audio = await Audio.findByIdAndDelete(id);

    if (!audio) {
      throw new Error("Brak nagrania");
    }

    await s3.deleteObject({ Bucket: "triotop", Key: audio.url }).promise();
  } catch (error) {
    throw new Error("Błąd podczas usuwania nagrania");
  }
};
