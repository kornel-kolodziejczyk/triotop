import Audios from "./Audios/Audios";
import { FC } from "react";
import Videos from "./Videos/Videos";
import classes from "./Demo.module.scss";

const Demo: FC = () => (
  <div className={classes.demo}>
    <Videos />
    <Audios />
  </div>
);

export default Demo;
