import { FC, useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Image from "next/image";
import classes from "./Carousel.module.scss";

const images = ["/Images/Carousel/carousel1.png", "/Images/Carousel/carousel2.png"];

const Carousel: FC = () => {
  const [image, setImage] = useState(0);

  const changeImage = (value: number) => {
    setImage((prevImage) => {
      if (prevImage + value > images.length - 1) return 0;
      if (prevImage + value < 0) return images.length - 1;
      return prevImage + value;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => changeImage(1), 3000);
    return () => clearInterval(timeout);
  }, [image]);

  return (
    <div className={classes.carousel}>
      <Image src={images[image]} width={1920} height={750} layout={"responsive"} alt="banner image" />
      <div className={classes.actions}>
        <MdChevronLeft onClick={() => changeImage(-1)} />
        <MdChevronRight onClick={() => changeImage(1)} />
      </div>
    </div>
  );
};

export default Carousel;
