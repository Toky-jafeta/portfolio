import { NavLink } from "react-router-dom"
import styled from "styled-components"

const HeaderNav = styled.nav`
    height: 10vh;
    display: flex;
    align-items: center;
    background-color:#008080;
    font-family: 'Quicksand-Bold', sans-serif;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding-bottom: 5px;
  width: 15%;
  text-align: center;
  border-bottom: 2px solid transparent;
  font-size: 20px;
  transition: border-color 0.3s, font-size 0.3s;

  &:hover {
    color: white;
    border-color: white;
    font-size: 22px;
  }

  &.active {
    color: white;
    border-color: white;
    font-size: 22px;
    font-weight: bold;
  }
`;

function Header(){
    return (
        <HeaderNav className="header-nav">
            <StyledNavLink to="/">Acceuil</StyledNavLink>
            <StyledNavLink to="/apropos">A propos</StyledNavLink>
            <StyledNavLink to="/services">Services</StyledNavLink>
            <StyledNavLink to="/experiences">Expériences</StyledNavLink>
        </HeaderNav>
    )
}

export default Header