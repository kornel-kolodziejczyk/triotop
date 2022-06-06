import { FC, ReactNode } from "react";

import classes from "./Route.module.scss";

interface Props {
  children: ReactNode;
}

const Route: FC<Props> = ({ children }) => <h1 className={classes.route}>{children}</h1>;

export default Route;
