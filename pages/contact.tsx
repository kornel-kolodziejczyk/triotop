import Contact from "../components/Contact/Contact";
import Head from "next/head";
import { NextPage } from "next";

const Page: NextPage = () => (
  <>
    <Head>
      <title>Triotop - Kontakt</title>
      <meta name="description" content="Triotop - Kontakt" />
    </Head>
    <Contact />
  </>
);

export default Page;
