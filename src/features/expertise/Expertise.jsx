import styled, { keyframes } from 'styled-components';
import { useInView } from '../../common/hooks/useInView';
import { CompetencesTechniques } from '../../datas/competences';
import { OutilsTechniques } from '../../datas/outils';

const Section = styled.section`
  padding: 100px 8%;
  background: var(--bg-primary);
  @media (max-width: 768px) { padding: 60px 5%; }
`;

const Header = styled.div`
  margin-bottom: 50px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Label = styled.span`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 10px 0 15px;
  @media (max-width: 768px) { font-size: 2rem; }
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
`;

const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  transition: all 0.4s ease;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? 0 : '25px'});
  transition-delay: ${({ $d }) => $d || '0s'};

  &:hover {
    border-color: var(--border-accent);
    box-shadow: var(--shadow-accent);
    transform: translateY(-4px);
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SkillList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkillItem = styled.li`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  padding-left: 16px;
  position: relative;

  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--accent-primary);
  }
`;

/* Tools marquee */
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const ToolsSection = styled.div`
  margin-top: 20px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transition: opacity 1s ease 0.5s;
`;

const ToolsLabel = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 20px;
`;

const MarqueeContainer = styled.div`
  overflow: hidden;
  position: relative;
  padding: 20px 0;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }
  &::before { left: 0; background: linear-gradient(90deg, var(--bg-primary), transparent); }
  &::after { right: 0; background: linear-gradient(270deg, var(--bg-primary), transparent); }
`;

const MarqueeTrack = styled.div`
  display: flex;
  gap: 16px;
  animation: ${scroll} 30s linear infinite;
  width: max-content;

  &:hover { animation-play-state: paused; }
`;

const ToolPill = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 50px;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    background: rgba(99, 102, 241, 0.05);
  }
`;

export default function Expertise() {
  const [headerRef, headerV] = useInView();
  const [gridRef, gridV] = useInView();
  const [toolsRef, toolsV] = useInView();

  const allTools = OutilsTechniques.flatMap(row => row.outils);

  return (
    <Section id="expertise">
      <Header ref={headerRef} $v={headerV}>
        <Label>{"// Expertise"}</Label>
        <Title>Compétences techniques</Title>
        <Subtitle>
          Un spectre large de compétences, de l'infrastructure réseau au développement
          logiciel, en passant par la cybersécurité et le cloud.
        </Subtitle>
      </Header>

      <Grid ref={gridRef}>
        {CompetencesTechniques.map((cat, i) => (
          <Card key={i} $v={gridV} $d={`${i * 0.15}s`}>
            <CardTitle>{cat.categorie}</CardTitle>
            <SkillList>
              {cat.items.map((item, j) => (
                <SkillItem key={j}>{item}</SkillItem>
              ))}
            </SkillList>
          </Card>
        ))}
      </Grid>

      <ToolsSection ref={toolsRef} $v={toolsV}>
        <ToolsLabel>Outils & Technologies</ToolsLabel>
        <MarqueeContainer>
          <MarqueeTrack>
            {[...allTools, ...allTools].map((tool, i) => (
              <ToolPill key={i}>{tool}</ToolPill>
            ))}
          </MarqueeTrack>
        </MarqueeContainer>
      </ToolsSection>
    </Section>
  );
}
