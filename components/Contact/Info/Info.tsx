import { BiCalendar } from "react-icons/bi";
import { BsFillEnvelopeOpenFill } from "react-icons/bs";
import { FC } from "react";
import { HiPhone } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import classes from "./Info.module.scss";

const Info: FC = () => (
  <div className={classes.info}>
    <div className={classes.item}>
      <MdLocationOn />
      <div className={classes.title}>ADRES</div>
      <div className={classes.content}>Siennica Różana 22-304</div>
    </div>
    <div className={classes.item}>
      <HiPhone />
      <div className={classes.title}>KONTAKT</div>
      <div className={classes.content}>
        Mariusz: 691 096 135
        <br />
        Agnieszka: 533 280 268
      </div>
    </div>
    <div className={classes.item}>
      <BsFillEnvelopeOpenFill />
      <div className={classes.title}>E-MAIL</div>
      <div className={classes.content}>triotop@interia.pl</div>
    </div>
    <div className={classes.item}>
      <BiCalendar />
      <div className={classes.title}>GODZINY KONTAKTU</div>
      <div className={classes.content}>
        Poniedziałek - Sobota
        <br />
        8:00 - 22:00
      </div>
    </div>
  </div>
);

export default Info;
