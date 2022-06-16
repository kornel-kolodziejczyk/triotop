import { FC, FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";

import Button from "../UI/Button/Button";
import Emoji from "../UI/Emoji/Emoji";
import { INotification } from "../../interfaces/notification";
import { IReview } from "../../interfaces/review";
import Loader from "../UI/Loader/Loader";
import Notification from "../UI/Notification/Notification";
import Review from "./Review/Review";
import axios from "axios";
import classes from "./Reviews.module.scss";
import emojis from "../../lib/emoji";

const Reviews: FC = () => {
  const [reviews, setReviews] = useState<IReview[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<INotification | null>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await axios.get<{ reviews: IReview[] }>("api/reviews");
        setReviews(data.reviews);
      } catch (error: any) {
        setNotification({ error });
      }
      setLoading(false);
    };

    getReviews();
  }, []);

  const deleteHandler = async (id: string) => {
    await axios.delete("api/reviews", { data: { id } });
    setReviews((prevReviews) => prevReviews && prevReviews.filter((review) => review.id !== id));
  };

  const acceptHandler = async (id: string) => {
    await axios.patch("api/reviews", { id });
    setReviews((prevReviews) => prevReviews && prevReviews.map((prevReview) => (prevReview.id === id ? { ...prevReview, accepted: true } : { ...prevReview })));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (textRef.current) {
        const { data } = await axios.post<{ review: IReview }>("api/reviews", { name, text: textRef.current.innerHTML });
        setReviews((prevReviews) => [data.review, ...(prevReviews ? prevReviews : [])]);
        setName("");
        setText("");
        textRef.current.innerHTML = "";
        setNotification({ success: "Wpis do księgi gości został dodany i oczekuje na akceptację" });
      }
    } catch (error: any) {
      setNotification({ error });
    }
    setLoading(false);
  };

  const acceptedReviews = reviews ? reviews.filter((review) => review.accepted) : [];
  const notAcceptedReviews = reviews ? reviews.filter((review) => !review.accepted) : [];

  const [range, setRange] = useState<Range>();

  const onEmojiClick = (emoji: String) => {
    const img = document.createElement("img");
    img.src = `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64/${emoji}.png`;
    if (range) {
      range.insertNode(img);
      range.collapse();
    }
    
    setText(textRef.current!.innerHTML);
  };

  const getCursor = () => {
    let selection = window.getSelection();
    if (selection) {
      setRange(selection.getRangeAt(0));
    }
  };

  const onInput = (e:FormEvent<HTMLSpanElement>) => {
    getCursor();
    setText(e.currentTarget.innerHTML);
  }

  return (
    <div className={classes.reviews}>
      {notification && <Notification value={notification} onHide={() => setNotification(null)} />}
      <form onSubmit={submitHandler}>
        <div className={classes.emojis}>
          {emojis.map((emoji) => (
            <Emoji key={emoji} emoji={emoji} onClick={() => onEmojiClick(emoji)} />
          ))}
        </div>
        <input type="text" placeholder="Imię i nazwisko" required value={name} onChange={(e) => setName(e.target.value)} />
        <span className={classes.text} id="contentEditable" data-placeholder="Treść wpisu" contentEditable onInput={onInput} onClick={getCursor} onKeyDown={getCursor} ref={textRef}></span>
        {loading ? <Button disabled={true}>Trwa wysyłanie...</Button> : <Button disabled={!text || !name}>Wyślij</Button>}
      </form>
      <div className={classes.items}>
        {reviews ? (
          <>
            {notAcceptedReviews.length > 0 && (
              <>
                <h2>Niezaakceptowane opinie:</h2>
                <div className={classes.notAccepted}>
                  {notAcceptedReviews.map((review) => (
                    <Review key={review.id} review={review} onDelete={() => deleteHandler(review.id)} onAccept={() => acceptHandler(review.id)} />
                  ))}
                </div>
              </>
            )}
            {acceptedReviews.length ? (
              <div className={classes.accepted}>
                {acceptedReviews.map((review) => (
                  <Review key={review.id} review={review} onDelete={() => deleteHandler(review.id)} />
                ))}
              </div>
            ) : (
              <div>Brak wpisów</div>
            )}
          </>
        ) : (
          <Loader>Wczytywanie wpisów...</Loader>
        )}
      </div>
    </div>
  );
};

export default Reviews;
