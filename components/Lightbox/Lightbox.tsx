import { FC, MouseEventHandler, TouchEvent, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Image from "next/image";
import classes from "./Lightbox.module.scss";

interface Props {
  images: string[];
  image: number;
  onClick: MouseEventHandler;
}

const Lightbox: FC<Props> = ({ images, image, onClick }) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      changeImage(-1);
    } else if (isRightSwipe) {
      changeImage(1);
    }
  };

  const changeImage = (value: number) => {
    setCurrentImage((prevCurrentImage) => {
      if (prevCurrentImage + value === images.length) return 0;
      if (prevCurrentImage + value === -1) return images.length - 1;
      return prevCurrentImage + value;
    });
  };

  return (
    <div className={classes.lightbox} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Image key={image} src={`${process.env.NEXT_PUBLIC_s3_bucketUrl}/${images[currentImage]}`} layout="fill" objectFit="contain" alt="" />
      <div className={classes.actions} onClick={onClick}>
        <MdChevronLeft onClick={(e) => changeImage(-1)} />
        <MdChevronRight onClick={(e) => changeImage(1)} />
      </div>
    </div>
  );
};

export default Lightbox;
