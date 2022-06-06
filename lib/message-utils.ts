import { IMessage } from "../interfaces/message";
import Message from "../models/Message";
import dbConnect from "./dbConnect";

export const getMessages = async (): Promise<IMessage[]> => {
  try {
    await dbConnect();
    const messages = await Message.find().lean();
    return messages.map((message) => ({ ...message, id: message._id.toString() }));
  } catch (error) {
    throw new Error("Błąd podczas pobierania wiadomości");
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await dbConnect();
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      throw new Error("Nie znaleziono wiadomości");
    }
  } catch (error) {
    throw new Error("Błąd podczas usuwania wiadomości");
  }
};
