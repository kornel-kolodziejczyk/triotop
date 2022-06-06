import { FC } from "react";
import Image from "next/image";
import classes from "./Member.module.scss";

interface Props {
  name: string;
  text: string;
  titles: string;
}

const Member: FC<Props> = ({ name, text, titles }) => (
  <div className={classes.member}>
    <Image src={`/Images/Site/${name}.jpg`} width={360} height={497} layout={"responsive"} alt={`image of ${name}`} />
    <h1>{name}</h1>
    <h2>{titles}</h2>
    <p>{text}​</p>
  </div>
);

export default Member;
