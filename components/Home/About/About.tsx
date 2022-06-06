import Container from "../../UI/Container/Container";
import { FC } from "react";
import Header from "../../UI/Header/Header";
import classes from "./About.module.scss";

const About: FC = () => (
  <div className={classes.about}>
    <Container>
      <Header>Kim jesteśmy</Header>
      <div className={classes.content}>
        <p>
          Jesteśmy trzyosobowym coverowym zespołem muzycznym istniejącym od 1998 roku. Zespół składa się z wokalistki oraz dwóch muzyków grających na instrumentach. Posiadamy profesjonalny zestaw
          nagłośnieniowy i sprzęt oświetleniowy.
        </p>
        <blockquote>
          Wspaniały zespół, Pełen profesjonalizm i mega zaangażowanie, świetnie dobrany repertuar dla każdej grupy wiekowej. Wszystkie utwory wykonywane na żywo. Jesteśmy baaaardzo zadowoleni.
          Polecamy serdecznie.
        </blockquote>
        <div className={classes.author}>Ania i Piotrek</div>
      </div>
    </Container>
  </div>
);

export default About;
