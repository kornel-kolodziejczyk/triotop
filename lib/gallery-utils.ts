import { IImage } from "../interfaces/image";
import Image from "../models/Image";
import S3 from "aws-sdk/clients/s3";
import dbConnect from "./dbConnect";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.s3_accessKeyId,
  secretAccessKey: process.env.s3_sercetAccessKey,
});

export const getImages = async (): Promise<IImage[]> => {
  try {
    await dbConnect();
    const images = await Image.find().sort({ date: -1 });
    return images.map((image) => ({ id: image.id, url: image.url }));
  } catch (error) {
    throw new Error("Błąd podczas wczytywania zdjęć");
  }
};

export const setImage = async (extension: string): Promise<IImage> => {
  try {
    await dbConnect();
    const image = new Image({ url: `${uuidv4()}.${extension}`, date: new Date() });
    await image.save();
    const url = await s3.getSignedUrlPromise("putObject", { Bucket: "triotop", Key: image.url, ACL: "public-read" });

    return { id: image.id, url };
  } catch (error) {
    throw new Error("Błąd podczas zapisywania zdjęcia");
  }
};

export const deleteImage = async (id: string) => {
  try {
    await dbConnect();
    const image = await Image.findByIdAndDelete(id);

    if (!image) {
      throw new Error("Brak zdjęcia");
    }

    await s3.deleteObject({ Bucket: "triotop", Key: image.url }).promise();
  } catch (error) {
    throw new Error("Błąd podczas usuwania zdjęcia");
  }
};
