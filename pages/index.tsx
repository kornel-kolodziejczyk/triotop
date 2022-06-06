import About from "../components/Home/About/About";
import Advantages from "../components/Home/Advantages/Advantages";
import Carousel from "../components/Home/Carousel/Carousel";
import Head from "next/head";
import Members from "../components/Home/Members/Members";
import type { NextPage } from "next";
import Services from "../components/Home/Services/Services";

const Page: NextPage = () => (
  <>
    <Head>
      <title>Triotop - Strona główna</title>
      <meta name="description" content="Triotop - Strona główna" />
    </Head>
    <Carousel />
    <About />
    <Services />
    <Advantages />
    <Members />
  </>
);

export default Page;
