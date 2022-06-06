import { FC, useEffect } from "react";

import classes from "./Notification.module.scss";

interface Props {
  value: { success?: string; error?: any };
  onHide: () => void;
}

const Notification: FC<Props> = ({ value, onHide }) => {
  let content;

  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 50000);

    return () => clearTimeout(timer);
  }, [onHide]);

  if (value.success) {
    content = <div className={classes.success}>{value.success}</div>;
  } else {
    content = <div className={classes.error}>{value.error.response?.data?.message || value.error.message || value.error}</div>;
  }
  return <div className={classes.notification}>{content}</div>;
};

export default Notification;
