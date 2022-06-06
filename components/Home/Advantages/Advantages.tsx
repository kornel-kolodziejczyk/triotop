import { BsCheckCircle } from "react-icons/bs";
import Container from "../../UI/Container/Container";
import { FC } from "react";
import Header from "../../UI/Header/Header";
import classes from "./Advantages.module.scss";

const Advantages: FC = () => (
  <div className={classes.advantages}>
    <Container>
      <Header>Dlaczego my</Header>
      <ul>
        <li>
          <BsCheckCircle /> Duże doświadczenie &#40;gramy od blisko 30 lat&#41;
        </li>
        <li>
          <BsCheckCircle /> Szeroki repertuar &#40;muzyka współczesna, lata 80, 90, również w innych językach&#41;
        </li>
        <li>
          <BsCheckCircle /> Muzyka dla każdego &#40;gramy dla młodszych i starszych&#41;
        </li>
        <li>
          <BsCheckCircle /> Elastyczność &#40;dopasowujemy się do Waszych wymagań, uwzględniamy repertuar na życzenie Państwa Młodych&#41;
        </li>
      </ul>
    </Container>
  </div>
);

export default Advantages;
