import { signOut, useSession } from "next-auth/react";

import { CSSTransition } from "react-transition-group";
import { FC } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import classes from "./Drawer.module.scss";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

interface Props {
  drawer: boolean;
  setDrawer: () => void;
}

const Drawer: FC<Props> = ({ drawer, setDrawer }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const logoutHandler = () => signOut();

  return typeof window !== "undefined"
    ? createPortal(
        <CSSTransition
          in={drawer}
          timeout={200}
          classNames={{ enter: classes.slideEnter, enterActive: classes.slideEnterActive, exit: classes.slideExit, exitActive: classes.slideExitActive }}
          mountOnEnter
          unmountOnExit
        >
          <nav className={classes.drawer}>
            <button onClick={setDrawer}>
              <MdClose size={20} />
            </button>
            <ul onClick={setDrawer}>
              <li className={classes.item}>
                <Link href="/">
                  <a className={router.pathname == "/" || router.pathname.includes("users") ? classes.active : ""}>Oferta</a>
                </Link>
              </li>
              <li className={classes.item}>
                <Link href="/gallery">
                  <a className={router.pathname.includes("gallery") ? classes.active : ""}>Galeria</a>
                </Link>
              </li>
              <li className={classes.item}>
                <Link href="/demo">
                  <a className={router.pathname.includes("demo") ? classes.active : ""}>Demo</a>
                </Link>
              </li>
              <li className={classes.item}>
                <Link href="/reviews">
                  <a className={router.pathname.includes("reviews") ? classes.active : ""}>Księga gości</a>
                </Link>
              </li>
              <li className={classes.item}>
                <Link href="/contact">
                  <a className={router.pathname.includes("contact") ? classes.active : ""}>Kontakt</a>
                </Link>
              </li>
              {session && (
                <>
                  <li className={classes.item}>
                    <Link href="/profile">
                      <a className={router.pathname.includes("profile") ? classes.active : ""}>Profil</a>
                    </Link>
                  </li>

                  <li className={classes.item}>
                    <span onClick={logoutHandler}>Wyloguj</span>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </CSSTransition>,
        document.getElementById("drawer") as HTMLElement
      )
    : null;
};

export default Drawer;
