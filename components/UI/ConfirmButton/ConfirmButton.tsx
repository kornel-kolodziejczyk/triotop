import { FC, ReactNode, useState } from "react";

import classes from "./ConfirmButton.module.scss";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onConfirm: () => void;
}

const ConfirmButton: FC<Props> = ({ children, disabled, onConfirm }) => {
  const [confirm, setConfirm] = useState(false);

  const confirmHandler = () => {
    setConfirm(false);
    onConfirm();
  };

  return confirm ? (
    <>
      <button className={classes.button} onClick={confirmHandler}>
        Potwierdź usunięcie
      </button>
      <button className={classes.button} onClick={() => setConfirm(false)}>
        Anuluj usunięcie
      </button>
    </>
  ) : (
    <button className={classes.button} disabled={disabled} onClick={() => setConfirm(true)}>
      {children}
    </button>
  );
};

export default ConfirmButton;
