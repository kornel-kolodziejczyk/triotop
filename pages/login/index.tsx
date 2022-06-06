import Container from "../../components/UI/Container/Container";
import Head from "next/head";
import Login from "../../components/Login/Login";
import { NextPage } from "next";
import Route from "../../components/UI/Route/Route";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Siatkówka - Logowanie</title>
        <meta name="description" content="Siatkówka - Logowanie" />
      </Head>
      <Route>LOGOWANIE</Route>
      <Container>
        <Login />
      </Container>
    </>
  );
};

export default Page;
