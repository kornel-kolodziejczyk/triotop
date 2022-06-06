import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { FormEvent, useState } from "react";

import Button from "../UI/Button/Button";
import Container from "../UI/Container/Container";
import Form from "../UI/Form/Form";
import Header from "../UI/Header/Header";
import { INotification } from "../../interfaces/notification";
import Info from "./Info/Info";
import Notification from "../UI/Notification/Notification";
import axios from "axios";
import classes from "./Contact.module.scss";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post<{ message: string }>("api/contact", { email, name, text });
      setEmail("");
      setName("");
      setText("");
      setNotification({ success: data.message });
    } catch (error: any) {
      setNotification({ error });
    }
    setLoading(false);
  };

  return (
    <section className={classes.contact}>
      <Info />
      <Container>
        <div className={classes.form}>
          {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
          <Header>Zapytaj o termin</Header>
          <Form onSubmit={submitHandler}>
            <div>
              <AiOutlineLock size={26} />
              <input type="text" placeholder="Imię i nazwisko" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <AiOutlineUser size={26} />
              <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <textarea placeholder="Treść" required rows={15} value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            {loading ? <Button disabled={true}>Trwa wysyłanie...</Button> : <Button disabled={!name || !text || !email}>Wyślij</Button>}
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
