import Container from "../../components/UI/Container/Container";
import Head from "next/head";
import { NextPage } from "next";
import Reviews from "../../components/Reviews/Reviews";
import Route from "../../components/UI/Route/Route";

const Page: NextPage = () => (
  <>
    <Head>
      <title>Triotop - Księga gości</title>
      <meta name="description" content="Triotop - Księga gości" />
    </Head>
    <Route>KSIĘGA GOŚCI</Route>
    <Container>
      <Reviews />
    </Container>
  </>
);

export default Page;
