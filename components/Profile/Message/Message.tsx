import { FC, useState } from "react";

import ConfirmButton from "../../UI/ConfirmButton/ConfirmButton";
import { IMessage } from "../../../interfaces/message";
import { INotification } from "../../../interfaces/notification";
import Notification from "../../UI/Notification/Notification";
import axios from "axios";
import classes from "./Message.module.scss";

interface Props {
  message: IMessage;
  onDelete: (id: string) => void;
}

const Message: FC<Props> = ({ message, onDelete }) => {
  const [notification, setNotification] = useState<INotification | null>(null);

  const deleteHandler = async () => {
    try {
      await axios.delete("api/messages", { data: { id: message.id } });
      onDelete(message.id);
    } catch (error: any) {
      setNotification({ error });
    }
  };

  return (
    <div className={classes.message}>
      {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
      <div>{`${message.name} (${message.email})`}</div>
      <div className={classes.date}>{new Date(message.date).toLocaleDateString()}</div>
      <div className={classes.text}>{message.text}</div>
      <div className={classes.actions}>
        <ConfirmButton onConfirm={deleteHandler}>Usuń</ConfirmButton>
      </div>
    </div>
  );
};

export default Message;
