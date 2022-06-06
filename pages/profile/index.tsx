import Container from "../../components/UI/Container/Container";
import Head from "next/head";
import { NextPage } from "next";
import Profile from "../../components/Profile/Profile";
import Route from "../../components/UI/Route/Route";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/login");
      }
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Triotop - Profil admina</title>
        <meta name="description" content="Triotop - Profil admina" />
      </Head>
      <Route>PROFIL</Route>
      <Container>
        <Profile />
      </Container>
    </>
  );
};
export default Page;
