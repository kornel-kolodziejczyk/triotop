import { FC, ReactNode } from "react";

import Spinner from "react-spinners/GridLoader";
import classes from "./Loader.module.scss";

interface Props {
  children?: ReactNode;
}

const Loader: FC<Props> = ({ children }) => (
  <div className={classes.loader}>
    <Spinner loading={true} />
    {children && <span>{children}</span>}
  </div>
);

export default Loader;
