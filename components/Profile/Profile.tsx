import { FC, FormEvent, useEffect, useState } from "react";

import { AiOutlineLock } from "react-icons/ai";
import Button from "../UI/Button/Button";
import Form from "../UI/Form/Form";
import Header from "../UI/Header/Header";
import { IMessage } from "../../interfaces/message";
import { INotification } from "../../interfaces/notification";
import Loader from "../UI/Loader/Loader";
import Message from "./Message/Message";
import Notification from "../UI/Notification/Notification";
import axios from "axios";
import classes from "./Profile.module.scss";

const Profile: FC = () => {
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState<INotification | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get<{ messages: IMessage[] }>("api/messages");
        setMessages(data.messages);
      } catch (error: any) {
        setNotification({ error });
      }
      setLoading(false);
    };

    getMessages();
  }, []);

  const deleteHandler = (id: string) => {
    setMessages((prevMessages) => prevMessages && prevMessages.filter((message) => message.id !== id));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.patch<{ message: string }>("api/profile", { currentPassword, newPassword });
      setNotification({ success: data.message });
    } catch (error: any) {
      setNotification({ error });
    }
    setLoading(false);
  };

  return (
    <div className={classes.profile}>
      {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
      <Form onSubmit={submitHandler}>
        <div>
          <AiOutlineLock size={26} />
          <input type="password" required min={7} placeholder="Aktualne hasło" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <AiOutlineLock size={26} />
          <input type="password" min={7} placeholder="Nowe hasło" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        {loading ? <Button disabled>Zapisywanie...</Button> : <Button disabled={!currentPassword && !newPassword}>Zapisz zmiany</Button>}
      </Form>
      <div className={classes.messages}>
        {messages ? (
          <>
            <Header>Wiadomości</Header>
            <div className={classes.content}>{messages.length ? messages.map((message) => <Message key={message.id} message={message} onDelete={deleteHandler} />) : <div>Brak wiadomości</div>}</div>
          </>
        ) : (
          <Loader>Wczytywanie wiadomości...</Loader>
        )}
      </div>
    </div>
  );
};

export default Profile;
