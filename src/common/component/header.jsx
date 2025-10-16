import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background: rgba(0, 128, 128, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;

const Logo = styled(motion.div)`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  letter-spacing: 1px;
  user-select: none;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;
  }

  @media (max-width: 900px) {
    position: absolute;
    top: 10vh;
    right: ${({ open }) => (open ? "0" : "-100%")};
    flex-direction: column;
    background: rgba(0, 128, 128, 0.95);
    width: 100%;
    padding: 40px 0;
    gap: 20px;
    transition: right 0.4s ease-in-out;
    align-items: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-family: 'Quicksand-SemiBold', sans-serif;
  font-size: 1.1rem;
  color: white;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: #fff;
    font-weight: 700;
  }

  &.active::after {
    width: 100%;
  }
`;

const BurgerMenu = styled.button`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  z-index: 1001;
  background: transparent;
  border: none;
  padding: 8px;
  align-items: center;

  @media (max-width: 900px) {
    display: flex;
  }

  span {
    width: 25px;
    height: 3px;
    background: white;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: block;
  }

  ${({ open }) =>
    open &&
    `
    span:nth-child(1) {
      transform: rotate(45deg) translateY(8px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translateY(-8px);
    }
  `}
`;

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Logo
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        aria-label="Toky - logo"
      >
        Toky<span style={{ color: "#00ffff" }}>.</span>
      </Logo>

      <BurgerMenu
        open={open}
        onClick={() => setOpen((s) => !s)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </BurgerMenu>

      <NavLinks open={open} role="menu" aria-hidden={!open && window.innerWidth <= 900}>
        <li role="none">
          <StyledNavLink to="/" onClick={() => setOpen(false)} role="menuitem">
            Accueil
          </StyledNavLink>
        </li>
        <li role="none">
          <StyledNavLink to="/apropos" onClick={() => setOpen(false)} role="menuitem">
            À propos
          </StyledNavLink>
        </li>
        <li role="none">
          <StyledNavLink to="/services" onClick={() => setOpen(false)} role="menuitem">
            Services
          </StyledNavLink>
        </li>
        <li role="none">
          <StyledNavLink to="/experiences" onClick={() => setOpen(false)} role="menuitem">
            Expériences
          </StyledNavLink>
        </li>
        <li role="none">
          <StyledNavLink to="/realisations" onClick={() => setOpen(false)} role="menuitem">
            Realisations
          </StyledNavLink>
        </li>
        <li role="none">
          <StyledNavLink to="/contact" onClick={() => setOpen(false)} role="menuitem">
            Contact
          </StyledNavLink>
        </li>
      </NavLinks>
    </HeaderContainer>
  );
}

export default Header;
