import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.$scrolled ? '70px' : '100px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background: rgba(240, 253, 244, 0.95); // Green 50
  border-bottom: 1px solid rgba(220, 252, 231, 0.8); // Green 100
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 70px;
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #2c3e50;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;

  .dot {
    color: #3498db;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $open }) => ($open ? "0" : "-100%")};
    flex-direction: column;
    background: rgba(255, 255, 255, 0.98);
    width: 280px;
    height: 100vh;
    padding: 80px 30px 40px;
    gap: 15px;
    transition: right 0.3s ease;
    align-items: flex-start;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${props => props.$isActive ? '#3498db' : '#2c3e50'};
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #3498db;
    background: rgba(52, 152, 219, 0.05);
  }

  &.active {
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px 20px;
    display: block;
    width: 100%;
  }
`;

const BurgerMenu = styled.button`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  z-index: 1001;
  background: transparent;
  border: none;
  padding: 8px;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 25px;
    height: 2px;
    background: #2c3e50;
    border-radius: 1px;
    transition: all 0.3s ease;
  }

  ${({ $open }) => $open && `
    span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `}
`;

const Overlay = styled.div`
  display: ${props => props.$open ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <HeaderContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        $scrolled={scrolled}
      >
        <Logo>
          Toky<span className="dot">.</span>
        </Logo>

        <nav>
          <BurgerMenu 
            $open={open} 
            onClick={() => setOpen(!open)}
            aria-label="Menu navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </BurgerMenu>

          <NavLinks $open={open}>
            <NavItem>
              <StyledNavLink 
                to="/" 
                $isActive={location.pathname === '/'}
                onClick={() => setOpen(false)}
              >
                Accueil
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink 
                to="/apropos" 
                $isActive={location.pathname === '/apropos'}
                onClick={() => setOpen(false)}
              >
                À propos
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink 
                to="/services" 
                $isActive={location.pathname === '/services'}
                onClick={() => setOpen(false)}
              >
                Services
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink 
                to="/experiences" 
                $isActive={location.pathname === '/experiences'}
                onClick={() => setOpen(false)}
              >
                Expériences
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink 
                to="/realisations" 
                $isActive={location.pathname === '/realisations'}
                onClick={() => setOpen(false)}
              >
                Réalisations
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink 
                to="/contact" 
                $isActive={location.pathname === '/contact'}
                onClick={() => setOpen(false)}
              >
                Contact
              </StyledNavLink>
            </NavItem>
          </NavLinks>
        </nav>

        <Overlay $open={open} onClick={() => setOpen(false)} />
      </HeaderContainer>
    </>
  );
}

export default Header;