import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./Logo.module.scss";

interface Props {
  type: "dark" | "light";
}

const Logo: FC<Props> = ({ type }) => (
  <div className={classes.logo}>
    <Link href="/">
      <Image src={`/Images/Site/logo-${type}.png`} width={208} height={46} alt="logo" />
    </Link>
  </div>
);

export default Logo;
