import styled from 'styled-components';
import { useLang } from '../../common/context/LanguageContext';
import { t, tr } from '../../i18n/translations';

const FooterContainer = styled.footer`
  padding: 60px 8% 30px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  @media (max-width: 768px) { padding: 40px 5% 20px; }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
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
  gap: 24px;
  flex-wrap: wrap;

  a {
    font-size: 0.85rem;
    color: var(--text-secondary);
    transition: color 0.3s ease;

    &:hover { color: var(--accent-primary); }
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  border-top: 1px solid var(--border);
  padding-top: 30px;
`;

const Copyright = styled.span`
  font-size: 0.8rem;
  color: var(--text-muted);
`;

const BackToTop = styled.button`
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    transform: translateY(-2px);
  }
`;

export default function Footer() {
  const { lang } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <TopRow>
        <Logo href="#accueil">Toky<span>.</span></Logo>
        <Nav>
          <a href="#apropos">{tr(t.footer.about, lang)}</a>
          <a href="#expertise">{tr(t.nav.expertise, lang)}</a>
          <a href="#realisations">{tr(t.footer.projects, lang)}</a>
          <a href="#services">{tr(t.nav.services, lang)}</a>
          <a href="#experiences">{tr(t.footer.journey, lang)}</a>
          <a href="#certifications">{tr(t.nav.certifications, lang)}</a>
          <a href="#contact">{tr(t.nav.contact, lang)}</a>
        </Nav>
      </TopRow>
      <BottomRow>
        <Copyright>© {currentYear} Toky Rasolomanitra. {tr(t.footer.rights, lang)}</Copyright>
        <BackToTop onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          ↑
        </BackToTop>
      </BottomRow>
    </FooterContainer>
  );
}
