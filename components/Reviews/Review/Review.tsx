import Button from "../../UI/Button/Button";
import ConfirmButton from "../../UI/ConfirmButton/ConfirmButton";
import { FC } from "react";
import { IReview } from "../../../interfaces/review";
import classes from "./Review.module.scss";
import { useSession } from "next-auth/react";

interface Props {
  review: IReview;
  onDelete: () => void;
  onAccept?: () => void;
}

const Review: FC<Props> = ({ review, onDelete, onAccept }) => {
  const { data: session } = useSession();

  return (
    <div className={classes.review}>
      <div className={classes.name}>{review.name}</div>
      <div className={classes.date}>{new Date(review.date).toLocaleDateString()}</div>
      <div className={classes.text} dangerouslySetInnerHTML={{ __html: review.text }}></div>
      {session && review.accepted && (
        <div className={classes.actions}>
          <ConfirmButton onConfirm={onDelete}>Usuń opinię</ConfirmButton>
        </div>
      )}
      {!review.accepted && (
        <div className={classes.actions}>
          <Button onClick={onAccept}>Zaakceptuj opinię</Button>
          <ConfirmButton onConfirm={onDelete}>Usuń opinię</ConfirmButton>
        </div>
      )}
    </div>
  );
};

export default Review;
