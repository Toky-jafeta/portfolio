import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { t, tr } from '../../i18n/translations';

const HeaderContainer = styled.header`
  position: fixed;
  top: 3px;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background: ${({ $scrolled }) => $scrolled ? 'color-mix(in srgb, var(--bg-primary) 92%, transparent)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${({ $scrolled }) => $scrolled ? '1px solid var(--border)' : '1px solid transparent'};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Logo = styled.a`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  span { color: var(--accent-primary); }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 900px) {
    position: fixed;
    top: 73px;
    right: ${({ $open }) => $open ? '0' : '-100%'};
    width: 100%;
    flex-direction: column;
    background: color-mix(in srgb, var(--bg-primary) 98%, transparent);
    backdrop-filter: blur(20px);
    padding: 40px 0;
    gap: 25px;
    transition: right 0.4s ease;
    border-bottom: 1px solid var(--border);
  }
`;

const NavLink = styled.a`
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  letter-spacing: 0.3px;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--accent-primary);
    transition: width 0.3s ease;
  }

  &:hover, &.active {
    color: var(--accent-primary);
  }
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const AvailableBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #22c55e;
  font-family: var(--font-mono);
  border: 1px solid rgba(34, 197, 94, 0.3);
  padding: 6px 14px;
  border-radius: 50px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
    50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const LangToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 50px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

const Burger = styled.button`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  padding: 8px;
  z-index: 1001;

  @media (max-width: 900px) { display: flex; }

  span {
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${({ $open }) => $open && `
    span:nth-child(1) { transform: rotate(45deg) translateY(7px); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: rotate(-45deg) translateY(-7px); }
  `}
`;

const sections = [
  { id: 'accueil',        key: 'home' },
  { id: 'apropos',        key: 'about' },
  { id: 'expertise',      key: 'expertise' },
  { id: 'realisations',   key: 'realisations' },
  { id: 'services',       key: 'services' },
  { id: 'certifications', key: 'certifications' },
  { id: 'contact',        key: 'contact' },
];

function Header() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return el ? { id: s.id, top: el.offsetTop - 100 } : null;
      }).filter(Boolean);
      const current = offsets.reverse().find(s => window.scrollY >= s.top);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeaderContainer $scrolled={scrolled}>
      <Logo href="#accueil" onClick={(e) => handleClick(e, 'accueil')}>
        Toky<span>.</span>
      </Logo>

      <Burger $open={open} onClick={() => setOpen(s => !s)} aria-label="Menu">
        <span /><span /><span />
      </Burger>

      <Nav $open={open}>
        {sections.map(s => (
          <NavLink
            key={s.id}
            href={`#${s.id}`}
            className={activeSection === s.id ? 'active' : ''}
            onClick={(e) => handleClick(e, s.id)}
          >
            {tr(t.nav[s.key], lang)}
          </NavLink>
        ))}
        <AvailableBadge>{tr(t.nav.available, lang)}</AvailableBadge>
        <LangToggle onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </LangToggle>
        <LangToggle onClick={toggleLang} title="Switch language">
          {lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
        </LangToggle>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
