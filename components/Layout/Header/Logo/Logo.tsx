import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  type: "dark" | "light";
}

const Logo: FC<Props> = ({ type }) => (
  <Link href="/">
    <Image src={`/Images/Site/logo-${type}.png`} width={208} height={46} alt="logo" />
  </Link>
);

export default Logo;
