import { signOut, useSession } from "next-auth/react";

import Container from "../../../UI/Container/Container";
import { FC } from "react";
import Link from "next/link";
import classes from "./Navigation.module.scss";
import { useRouter } from "next/router";

const Navigation: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const logoutHandler = () => signOut();

  return (
    <nav className={classes.navigation}>
      <Container>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname == "/" ? classes.active : ""}>Oferta</a>
            </Link>
          </li>
          <li>
            <Link href="/gallery">
              <a className={router.pathname.includes("gallery") ? classes.active : ""}>Galeria</a>
            </Link>
          </li>
          <li>
            <Link href="/demo">
              <a className={router.pathname.includes("demo") ? classes.active : ""}>Demo</a>
            </Link>
          </li>
          <li>
            <Link href="/reviews">
              <a className={router.pathname.includes("reviews") ? classes.active : ""}>Księga gości</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className={router.pathname.includes("contact") ? classes.active : ""}>Kontakt</a>
            </Link>
          </li>
          {session && (
            <>
              <li>
                <Link href="/profile">
                  <a className={router.pathname.includes("profile") ? classes.active : ""}>Profil</a>
                </Link>
              </li>
              <li>
                <span onClick={logoutHandler}>Wyloguj</span>
              </li>
            </>
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navigation;
