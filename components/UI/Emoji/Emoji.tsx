import { FC } from "react";
import Image from "next/image";
import emojis from "../../../lib/emoji";

interface Props {
  emoji: typeof emojis[number];
  onClick?: () => void;
}

const Emoji: FC<Props> = ({ emoji, onClick }) => (
  <Image src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64/${emoji}.png`} width={24} height={24} alt="emoji" onClick={onClick} />
);

export default Emoji;
