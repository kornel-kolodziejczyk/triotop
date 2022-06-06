import Container from "../../components/UI/Container/Container";
import Gallery from "../../components/Gallery/Gallery";
import Head from "next/head";
import { NextPage } from "next";
import Route from "../../components/UI/Route/Route";

const Page: NextPage = () => (
  <>
    <Head>
      <title>Triotop - Galeria</title>
      <meta name="description" content="Triotop - Galeria" />
    </Head>
    <Route>GALERIA ZDJĘĆ</Route>
    <Container>
      <Gallery />
    </Container>
  </>
);

export default Page;
