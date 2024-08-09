import { Link } from "gatsby";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import "./BaseLayout.scss";

export default function BaseLayout(
  props: React.PropsWithChildren<{ title: string }>
) {
  const [collapsed, setCollapsed] = React.useState(() => false);

  return (
    <div>
      <Helmet
        htmlAttributes={{
          lang: "de",
        }}
      >
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>
      <Navbar color="dark" expand="md" dark>
        <NavbarToggler
          onClick={function noRefCheck() {
            setCollapsed(!collapsed);
          }}
        />
        <Collapse navbar isOpen={collapsed}>
          <Nav navbar>
            <NavItem>
              <NavLink
                tag={Link}
                to="/distance"
                onClick={() => setCollapsed(false)}
              >
                Corona-Abstandsrechner
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/" onClick={() => setCollapsed(false)}>
                Finalrechner
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/crosses"
                onClick={() => setCollapsed(false)}
              >
                Vorrunden-Wahrscheinlichkeiten
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/tempi"
                onClick={() => setCollapsed(false)}
              >
                Tempi
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {props.children}
      <div className="text-center">
        <a href="https://www.github.com/fellmann/tanzen" target="_blank">
          Über ...
        </a>
      </div>
    </div>
  );
}
