import { GiBalloons, GiDiamondRing, GiMusicalNotes, GiSoundWaves } from "react-icons/gi";

import Container from "../../UI/Container/Container";
import { FC } from "react";
import Header from "../../UI/Header/Header";
import Service from "./Service/Service";
import classes from "./Services.module.scss";

const Services: FC = () => (
  <div className={classes.services}>
    <Container>
      <Header>Nasza oferta</Header>
      <div className={classes.content}>
        <Service title="Wesela" text="Zabawa oczepinowa, biesiada za stołami, zabawa do białego rana.">
          <GiBalloons />
        </Service>
        <Service title="Imprezy okolicznościowe" text="Zabawy, dancingi, bale, studniówki.">
          <GiMusicalNotes />
        </Service>
        <Service title="Oprawa muzyczna ślubu" text="Śpiew podczas uroczystości ślubnych.">
          <GiDiamondRing />
        </Service>
        <Service title="Nagłośnienie imprez plenerowych" text="Scena, profesjonalne nagłośnienie i oświetlenie.">
          <GiSoundWaves />
        </Service>
      </div>
    </Container>
  </div>
);

export default Services;
