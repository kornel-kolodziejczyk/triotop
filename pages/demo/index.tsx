import Container from "../../components/UI/Container/Container";
import Demo from "../../components/Demo/Demo";
import Head from "next/head";
import { NextPage } from "next";
import Route from "../../components/UI/Route/Route";

const Page: NextPage = () => (
  <>
    <Head>
      <title>Triotop - Demo</title>
      <meta name="description" content="Triotop - Demo" />
    </Head>
    <Route>DEMO</Route>
    <Container>
      <Demo />
    </Container>
  </>
);

export default Page;
