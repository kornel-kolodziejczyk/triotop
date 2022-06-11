import Container from "../../UI/Container/Container";
import { FC } from "react";
import Header from "../../UI/Header/Header";
import Member from "./Member/Member";
import classes from "./Members.module.scss";

const Members: FC = () => (
  <div className={classes.members}>
    <Container>
      <Header>Skład zespołu</Header>
      <div className={classes.content}>
        <Member
          name="mariusz"
          titles="Gitarzysta"
          text="Na gitarze gra od 27 lat. Potrafi grać także na instrumentach klawiszowych oraz na perkusji. Był instruktorem nauki gry na gitarze oraz keyboard w GCK Wojsławice. Ukończył także Akademię Realizacji Dźwięku w Warszawie jako Realizator Dźwięku Estradowego. Dzięki wiedzy zdobytej podczas szkolenia, zajmuje się nagłaśnianiem imprez plenerowych jako Akustyk dźwięku. Obecnie instruktor Domu Kultury w Krasnymstawie."
        />
        <Member
          name="agnieszka"
          titles="Wokalistka"
          text="Agnieszka urodziła się z mikrofonem w ręku. Śpiewa od najmłodszych lat życia mając na swoim koncie wiele nagród w konkursach lokalnych oraz międzynarodowych. Jako członek Zespołu Tańca Ludowego UMCS, Teatru Pokoleń oraz MDK Krasnystaw zdobyła duże doświadczenie sceniczne dzięki czemu jej repertuar jest bardzo szeroki - od muzyki folkowej do rock, pop, disco."
        />
        <Member
          name="daniel"
          titles="Klawiszowiec, wokalista"
          text="Na klawiszach nauczył się grać w wieku 8 lat. Wirtuoz akordeonu. Jego gra to poezja. Związany z muzyką na poważnie od 15 roku życia. Jest również głównym wokalistą w zespole, ciepła barwa głosu chwyta za serce na każdej imprezie. To człowiek wszechstronnie utalentowany a jednocześnie bardzo skromny, jakby nie zdawał sobie sprawy ze swoich atutów."
        />
      </div>
    </Container>
  </div>
);

export default Members;
