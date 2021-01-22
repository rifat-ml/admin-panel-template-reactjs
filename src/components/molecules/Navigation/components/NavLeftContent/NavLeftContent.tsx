import { memo } from "react";

import { Menu } from "antd";
import { MenuMode } from "antd/lib/menu";
import cx from "classnames";
import { useLocation } from "react-router-dom";

import { ReactComponent as Logo } from "@app/assets/images/logo.svg";
import { PRIVATE_LIST } from "@app/routes/routes.config";
import { RouteItemDef } from "@app/types/route.types";

import NavLink from "../NavLink/NavLink";
import NavSubMenu from "../NavSubMenu/NavSubMenu";
import styles from "./NavLeftContent.module.scss";

const navLinks: RouteItemDef[] = PRIVATE_LIST.filter(
  route => !route.hideInNavigation
);

interface NavLeftContentProps {
  mode?: MenuMode;
}

const NavLeftContent = memo(({ mode = "horizontal" }: NavLeftContentProps) => {
  const location = useLocation();

  const isSidebar = mode === "inline";
  const rootPathname = isSidebar
    ? [...location.pathname.split(/(?=\/)/g, 1)]
    : undefined;

  return (
    <>
      <div
        className={cx(styles.logoContainer, {
          [styles.isSidebar]: isSidebar,
        })}
      >
        <Logo className={styles.logo} />
      </div>
      <Menu
        mode={mode}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={rootPathname}
        theme="dark"
      >
        {navLinks.map(navItem =>
          navItem.nestedRoutes?.length ? (
            <NavSubMenu
              key={navItem.path}
              item={navItem}
              isSidebar={isSidebar}
            />
          ) : (
            <Menu.Item key={navItem.path}>
              <NavLink navItem={navItem} />
            </Menu.Item>
          )
        )}
      </Menu>
    </>
  );
});

export default NavLeftContent;
