import { BsYoutube } from "react-icons/bs";
import Logo from "../Header/Logo/Logo";
import classes from "./Footer.module.scss";

const Footer = () => (
  <footer className={classes.footer}>
    <Logo type="light" />
    <div>
      Copyright © 2022 <span>Kornel Kołodziejczyk</span>
    </div>
  </footer>
);

export default Footer;
