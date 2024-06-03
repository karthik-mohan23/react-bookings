import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
const navlinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/offers",
    label: "Offers",
  },
  {
    href: "/sign-in",
    label: "Sign In",
  },
  {
    href: "/sign-up",
    label: "Sign Up",
  },
];

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let location = useLocation();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Bookings</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === "/"}>
          <NavLink color="foreground" to="/">
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/offers"}>
          <NavLink color="foreground" to="/offers">
            Offers
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem
          className="hidden lg:flex"
          isActive={location.pathname === "/sign-in"}>
          <NavLink to="/sign-in">Login</NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {navlinks.map(({ href, label }, index) => (
          <NavbarMenuItem key={label}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === navlinks.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              to={href}
              size="lg">
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
