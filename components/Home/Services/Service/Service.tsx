import { FC, ReactNode } from "react";

import classes from "./Service.module.scss";

interface Props {
  title: string;
  text: string;
  children: ReactNode;
}

const Service: FC<Props> = ({ title, text, children }) => (
  <div className={classes.service}>
    <div className={classes.icon}>{children}</div>
    <p>{title}</p>
    <hr />
    <div className={classes.text}>{text}</div>
  </div>
);

export default Service;
