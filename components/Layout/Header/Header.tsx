import { FC, useState } from "react";

import Drawer from "../Drawer/Drawer";
import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";
import Overlay from "../../UI/Overlay/Overlay";
import Toggler from "./Toggler/Toggler";
import classes from "./Header.module.scss";

const Header: FC = () => {
  const [drawer, setDrawer] = useState(false);

  const setDrawerHandler = () => setDrawer((prevDrawer) => !prevDrawer);

  return (
    <header className={classes.header}>
      <Logo type="dark" />
      <Navigation />
      <Toggler setDrawer={setDrawerHandler} />
      <Drawer drawer={drawer} setDrawer={setDrawerHandler} />
      {drawer && <Overlay setDrawer={setDrawerHandler} />}
    </header>
  );
};

export default Header;
