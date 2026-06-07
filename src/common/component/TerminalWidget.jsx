import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

/* ── Animations ── */
const blink = keyframes`0%,100%{opacity:1}50%{opacity:0}`;
const fadeIn = keyframes`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}`;
const matrixRain = keyframes`0%{opacity:1;transform:translateY(-20px)}100%{opacity:0;transform:translateY(20px)}`;

/* ── Styled Components ── */
const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 8000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(99,102,241,0.25);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 35px rgba(99,102,241,0.4);
    border-color: var(--accent-primary);
  }
`;

const Tooltip = styled.span`
  position: fixed;
  bottom: 95px;
  right: 28px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 8001;
  pointer-events: none;
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 14px;
    border: 6px solid transparent;
    border-top-color: var(--border);
  }
`;

const Window = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 680px;
  max-width: calc(100vw - 40px);
  height: 420px;
  background: #0d1117;
  border: 1px solid rgba(99,102,241,0.4);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.12);
  display: flex;
  flex-direction: column;
  z-index: 9000;
  animation: ${fadeIn} 0.25s ease;
  overflow: hidden;
  resize: both;
  cursor: default;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  cursor: move;
  user-select: none;
  flex-shrink: 0;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$c};
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

const TitleText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: #8b949e;
  margin-left: 6px;
  flex: 1;
  text-align: center;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.6;
  color: #c9d1d9;
  scroll-behavior: smooth;
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #21262d; border-radius: 3px; }
`;

const Line = styled.div`
  animation: ${fadeIn} 0.2s ease;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Prompt = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
  flex-shrink: 0;
  padding: 0 16px 12px;
`;

const PromptUser = styled.span`color: #7ee787;font-family:var(--font-mono);font-size:0.82rem;`;
const PromptAt   = styled.span`color: #8b949e;font-family:var(--font-mono);font-size:0.82rem;`;
const PromptDir  = styled.span`color: #79c0ff;font-family:var(--font-mono);font-size:0.82rem;`;
const PromptSym  = styled.span`color: #6366f1;font-family:var(--font-mono);font-size:0.82rem;`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e6edf3;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  caret-color: #6366f1;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #6366f1;
  animation: ${blink} 1s step-end infinite;
  vertical-align: text-bottom;
`;

/* ── Color helpers ── */
const ESC = '\u001b';
const c = {
  green:  s => `${ESC}[green]${s}${ESC}[/]`,
  cyan:   s => `${ESC}[cyan]${s}${ESC}[/]`,
  yellow: s => `${ESC}[yellow]${s}${ESC}[/]`,
  red:    s => `${ESC}[red]${s}${ESC}[/]`,
  purple: s => `${ESC}[purple]${s}${ESC}[/]`,
  dim:    s => `${ESC}[dim]${s}${ESC}[/]`,
};

function renderColored(text) {
  const map = {
    green: '#7ee787', cyan: '#79c0ff', yellow: '#e3b341',
    red: '#ff7b72', purple: '#d2a8ff', dim: '#6e7681',
  };
  // eslint-disable-next-line no-control-regex
  const parts = text.split(/\u001b\[(\w+)\](.*?)\u001b\[\/\]/gs);
  const result = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      result.push(<span key={i}>{parts[i]}</span>);
    } else if (i % 3 === 1) {
      const color = map[parts[i]] || '#c9d1d9';
      result.push(<span key={i} style={{ color }}>{parts[i + 1]}</span>);
      i++;
    }
  }
  return result;
}

/* ── Commands ── */
const COMMANDS = {
  help: () => [
    c.purple('╔════════════════════════════════════════════╗'),
    c.purple('║') + c.yellow('   Toky Shell v2.0 — Available Commands     ') + c.purple('║'),
    c.purple('╚════════════════════════════════════════════╝'),
    '',
    c.cyan('whoami') + '           → Mon identité complète',
    c.cyan('nmap -sV toky') + '    → Scanner mes compétences',
    c.cyan('ls projects/') + '     → Lister mes réalisations',
    c.cyan('cat contact.txt') + '  → Mes coordonnées',
    c.cyan('traceroute career') + ' → Mon parcours professionnel',
    c.cyan('ps aux') + '           → Mes projets en cours',
    c.cyan('uname -a') + '         → Infos système (certifications)',
    c.cyan('ping toky') + '        → Tester la connexion',
    c.cyan('sudo hire toky') + '   → ' + c.yellow('★ Commande secrète ★'),
    c.cyan('fortune') + '          → Citation aléatoire',
    c.cyan('matrix') + '           → Mode Matrix',
    c.cyan('clear') + '            → Effacer le terminal',
    c.cyan('exit') + '             → Fermer le terminal',
    '',
    c.dim('Astuce : utilisez ↑/↓ pour naviguer dans l\'historique'),
  ],

  whoami: () => [
    '',
    c.purple('  ████████╗ ██████╗ ██╗  ██╗██╗   ██╗'),
    c.purple('     ██╔══╝██╔═══██╗██║ ██╔╝╚██╗ ██╔╝'),
    c.purple('     ██║   ██║   ██║█████╔╝  ╚████╔╝ '),
    c.purple('     ██║   ██║   ██║██╔═██╗   ╚██╔╝  '),
    c.purple('     ██║   ╚██████╔╝██║  ██╗   ██║   '),
    c.purple('     ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   '),
    '',
    c.green('Name:') + '        Toky Rasolomanitra',
    c.green('Role:') + '        Ingénieur Systèmes, Réseaux & Cybersécurité',
    c.green('Location:') + '    Antananarivo, Madagascar',
    c.green('Experience:') + '  12+ ans en infrastructure IT',
    c.green('Focus:') + '       Cybersécurité · Architecture Réseau · Python',
    c.green('Company:') + '     ' + c.cyan('Nexthope') + ' (fondateur & ingénieur senior)',
    c.green('Bug Bounty:') + '  ' + c.yellow('RootMe: 1055 pts') + ' | HackTheBox: Active',
    c.green('Certifs:') + '     FCP · FCA · FCF · Kubernetes · Docker',
    c.green('Status:') + '      ' + c.yellow('● DISPONIBLE') + ' pour missions',
    '',
  ],

  'nmap -sV toky': () => [
    '',
    c.yellow('Starting Nmap 7.94 ( https://nmap.org )'),
    c.yellow('Nmap scan report for toky.rasolomanitra.mg (0.0.0.0)'),
    c.yellow('Host is up (0.001s latency).'),
    '',
    c.dim('PORT       STATE  SERVICE          VERSION'),
    c.green('22/tcp     open   ssh              OpenSSH (Linux admin)'),
    c.green('80/tcp     open   http             React/Node.js (Web dev)'),
    c.green('443/tcp    open   https            SSL/TLS hardened'),
    c.green('8080/tcp   open   python-api       FastAPI / Django REST'),
    c.green('514/tcp    open   syslog           FortiAnalyzer, SNMP'),
    c.green('1194/tcp   open   vpn              FortiGate IPSEC/SSL-VPN'),
    c.green('4444/tcp   open   pentest          Metasploit, Burp Suite'),
    c.green('9090/tcp   open   monitoring       Custom Python tools'),
    '',
    c.yellow('Service Info: Expert in Fortinet, Cisco, Extreme Networks'),
    c.dim('Nmap done: 1 IP address (1 host up) scanned in 0.42s'),
    '',
  ],

  'ls projects/': () => [
    '',
    c.cyan('drwxr-xr-x') + '  BMOI/         ' + c.dim('# Migration FortiGate — Sept 2025'),
    c.cyan('drwxr-xr-x') + '  TALYS/        ' + c.dim('# CheckPoint→FortiGate — Avr-Août 2025'),
    c.cyan('drwxr-xr-x') + '  Orange_CBIO/  ' + c.dim('# Network Deploy — Oct 2024→Présent'),
    c.cyan('drwxr-xr-x') + '  Africa50/     ' + c.dim('# Network Provisioning — Sept 2024'),
    c.cyan('drwxr-xr-x') + '  Gendarmerie/  ' + c.dim('# SysAdmin + Dev — Infrastructure'),
    c.cyan('-rw-r--r--') + '  CyberAudit.py ' + c.dim('# Python pentest automation tool'),
    c.cyan('-rw-r--r--') + '  log_analysis/ ' + c.dim('# Python log analyser (TALYS)'),
    '',
    c.dim('Total: 50+ projets livrés sur 12 ans'),
    '',
  ],

  'cat contact.txt': () => [
    '',
    c.green('# contact.txt — Toky Rasolomanitra'),
    '',
    c.yellow('Email:') + '      contact@innovasec.io',
    c.yellow('Phone:') + '      +261 38 90 016 79',
    c.yellow('Location:') + '   Antananarivo, Madagascar',
    c.yellow('LinkedIn:') + '   linkedin.com/in/toky-rasolomanitra-121896220',
    c.yellow('GitHub:') + '     github.com/Toky-jafeta',
    c.yellow('RootMe:') + '     root-me.org (1055 pts)',
    '',
    c.dim('Disponible pour : freelance, CDI, missions à distance ou sur site'),
    '',
  ],

  'traceroute career': () => [
    '',
    c.yellow('traceroute to career.toky.dev, 30 hops max'),
    '',
    c.green(' 1') + '  ' + c.cyan('webhelp.mg') + '           ' + c.dim('Technicien IT — 2012-2015'),
    c.green(' 2') + '  ' + c.cyan('webhelp.mg') + '           ' + c.dim('Développeur BI (Power BI, Python) — 2015-2018'),
    c.green(' 3') + '  ' + c.cyan('madagascar-internet.mg') + ' ' + c.dim('Développeur iOS/Android — 2018-2019'),
    c.green(' 4') + '  ' + c.cyan('cidst.mg') + '             ' + c.dim('Développeur Web — 2019'),
    c.green(' 5') + '  ' + c.cyan('gendarmerie.mg') + '       ' + c.dim('SysAdmin + Dev — Infrastructure'),
    c.green(' 6') + '  ' + c.cyan('nexthope.mg') + '          ' + c.dim('Ingénieur Systèmes & Réseaux — 2014→présent'),
    c.green(' 7') + '  ' + c.cyan('bocasay.mg') + '           ' + c.dim('Développeur Python/Django — 2023-2024'),
    c.green(' 8') + '  ' + c.cyan('bug-bounty.toky') + '     ' + c.dim('Pentester freelance — 2023→présent'),
    c.green(' 9') + '  ' + c.cyan('orange.mg') + '            ' + c.dim('Chef de Projet / Ingénieur — 2024→présent'),
    '',
    c.yellow('Destination reached in 12 years. Packet loss: 0%'),
    '',
  ],

  'ps aux': () => [
    '',
    c.dim('USER       PID  %CPU  %MEM  COMMAND'),
    c.green('toky      1001  35.2   8.1  python3 log_analysis_talys.py'),
    c.green('toky      1002  28.7   6.4  network_audit --client=orange'),
    c.green('toky      1003  15.4   4.2  bug_bounty_hunter --mode=active'),
    c.green('toky      1004  10.1   3.0  nexthope_admin --manage'),
    c.green('toky      1005   5.2   1.8  certif_study --aws-practitioner'),
    c.green('toky      1006   3.4   1.2  portfolio_redesign --status=done'),
    '',
    c.dim('6 processes running | Load avg: expert'),
    '',
  ],

  'uname -a': () => [
    '',
    c.yellow('TokOS 12.0.0-LTS #senior SMP Engineer'),
    '',
    c.green('Kernel:') + '       TokOS v12 (12 ans d\'expérience)',
    c.green('Architecture:') + ' x86_64 (multi-domaine)',
    c.green('Modules:') + '      fortinet.ko cisco.ko extreme.ko python3.ko react.ko',
    c.green('Security:') + '     FCP · FCA · FCF · Kubernetes · Docker',
    c.green('Uptime:') + '       12 years, no kernel panic',
    c.green('Memory:') + '       50+ projets en RAM',
    c.green('CPU:') + '          Réseau | Sécu | Dev | Gestion projet',
    '',
  ],

  'ping toky': () => {
    const times = ['1.2ms', '0.9ms', '1.1ms', '1.0ms'];
    return [
      '',
      c.yellow('PING toky.rasolomanitra.mg: 56 octets de données'),
      ...times.map((t, i) =>
        `64 bytes from toky: icmp_seq=${i+1} ttl=64 time=${c.green(t)}`
      ),
      '',
      c.yellow('--- Statistiques ---'),
      '4 paquets transmis, 4 reçus, ' + c.green('0% perte'),
      'rtt min/avg/max = 0.9/1.05/1.2 ms',
      c.green('→ Toky répond. Toujours.'),
      '',
    ];
  },

  'sudo hire toky': () => [
    '',
    c.yellow('[sudo] password for recruiter: ') + c.dim('••••••••'),
    '',
    c.green('✓ Authentication successful'),
    c.green('✓ Checking availability... OPEN'),
    c.green('✓ Verifying skills... 12 years CONFIRMED'),
    c.green('✓ Certifications... FCP, FCA, FCF, K8s, Docker'),
    '',
    c.purple('╔═══════════════════════════════════════╗'),
    c.purple('║') + c.yellow('   ACCESS GRANTED — Welcome aboard!    ') + c.purple('║'),
    c.purple('╚═══════════════════════════════════════╝'),
    '',
    'Prochaine étape : ' + c.cyan('cat contact.txt'),
    '',
  ],

  fortune: () => {
    const quotes = [
      ['"The quieter you become, the more you can hear."', '— Ram Dass'],
      ['"Security is a process, not a product."', '— Bruce Schneier'],
      ['"The best way to predict the future is to create it."', '— Alan Kay'],
      ['"There are only two types of companies: those that have been hacked, and those that will be."', '— Robert Mueller'],
      ['"In God we trust. All others we monitor."', '— NSA motto'],
      ['"Simplicity is the ultimate sophistication."', '— Leonardo da Vinci'],
    ];
    const [q, a] = quotes[Math.floor(Math.random() * quotes.length)];
    return ['', c.yellow(q), c.dim('  ' + a), ''];
  },

  matrix: () => ['__MATRIX__'],

  clear: () => ['__CLEAR__'],

  exit: () => ['__EXIT__'],

  ls: () => COMMANDS['ls projects/'](),
  'cat contact': () => COMMANDS['cat contact.txt'](),
  'nmap toky': () => COMMANDS['nmap -sV toky'](),
};

const UNKNOWN = (cmd) => [
  c.red(`bash: ${cmd}: command not found`),
  c.dim('Type help to see available commands.'),
];

const WELCOME = [
  c.purple('╔═══════════════════════════════════════════════════╗'),
  c.purple('║') + c.yellow('  Toky Shell v2.0 — Interactive Portfolio Terminal  ') + c.purple('║'),
  c.purple('╚═══════════════════════════════════════════════════╝'),
  '',
  'Bienvenue ! Tapez ' + c.cyan('help') + ' pour voir les commandes disponibles.',
  c.dim('Pro tip: essayez "sudo hire toky" 😉'),
  '',
];

/* ── Matrix overlay ── */
const MatrixOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-content: flex-start;
  border-radius: 12px;
`;

const MatrixChar = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #00ff41;
  opacity: ${p => p.$o};
  animation: ${matrixRain} ${p => p.$d}s linear infinite;
  animation-delay: ${p => p.$delay}s;
  width: 14px;
  text-align: center;
`;

function MatrixEffect({ onDone }) {
  const chars = '01アイウエオカキクケコサシスセソネハヒフ';
  const items = Array.from({ length: 400 }, (_, i) => ({
    ch: chars[Math.floor(Math.random() * chars.length)],
    o: Math.random().toFixed(2),
    d: (0.5 + Math.random() * 2).toFixed(2),
    delay: (Math.random() * 2).toFixed(2),
  }));

  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <MatrixOverlay>
      {items.map((it, i) => (
        <MatrixChar key={i} $o={it.o} $d={it.d} $delay={it.delay}>
          {it.ch}
        </MatrixChar>
      ))}
    </MatrixOverlay>
  );
}

/* ── Main Component ── */
export default function TerminalWidget() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const dragRef = useRef({ dragging: false, ox: 0, oy: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);

    const promptLine = `${ESC}[green]toky${ESC}[/]${ESC}[dim]@${ESC}[/]${ESC}[cyan]portfolio${ESC}[/]${ESC}[dim]:~$${ESC}[/] ${raw}`;
    const handler = COMMANDS[cmd];
    const output = handler ? handler() : UNKNOWN(cmd);

    if (output[0] === '__CLEAR__') {
      setLines([]);
      return;
    }
    if (output[0] === '__EXIT__') {
      setOpen(false);
      return;
    }
    if (output[0] === '__MATRIX__') {
      setShowMatrix(true);
      setLines(l => [...l, promptLine, c.green('Initiating matrix protocol...'), '']);
      return;
    }

    setLines(l => [...l, promptLine, ...output]);
  }, []);

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx] || '');
    }
  };

  /* Drag logic */
  const onMouseDown = (e) => {
    if (!windowRef.current) return;
    dragRef.current = {
      dragging: true,
      ox: e.clientX - windowRef.current.getBoundingClientRect().left,
      oy: e.clientY - windowRef.current.getBoundingClientRect().top,
    };
    const onMove = (ev) => {
      if (!dragRef.current.dragging) return;
      windowRef.current.style.left = (ev.clientX - dragRef.current.ox) + 'px';
      windowRef.current.style.top  = (ev.clientY - dragRef.current.oy) + 'px';
      windowRef.current.style.bottom = 'auto';
      windowRef.current.style.right  = 'auto';
    };
    const onUp = () => { dragRef.current.dragging = false; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp, { once: true });
  };

  return (
    <>
      {showTooltip && !open && (
        <Tooltip>$ open terminal</Tooltip>
      )}

      <ToggleButton
        onClick={() => setOpen(o => !o)}
        title="Terminal interactif"
        aria-label="Ouvrir le terminal"
      >
        {open ? '✕' : '>_'}
      </ToggleButton>

      {open && (
        <Window ref={windowRef}>
          {showMatrix && (
            <MatrixEffect onDone={() => {
              setShowMatrix(false);
              setLines(l => [...l, c.green('Matrix mode désactivé.'), '']);
            }} />
          )}

          <TitleBar onMouseDown={onMouseDown}>
            <Dot $c="#ff5f57" onClick={() => setOpen(false)} title="Fermer" />
            <Dot $c="#febc2e" onClick={() => {}} title="Réduire" />
            <Dot $c="#28c840" onClick={() => {}} title="Agrandir" />
            <TitleText>toky@portfolio:~</TitleText>
          </TitleBar>

          <Body ref={bodyRef} onClick={() => inputRef.current?.focus()}>
            {lines.map((line, i) => (
              <Line key={i}>
                {typeof line === 'string' ? renderColored(line) : line}
              </Line>
            ))}
          </Body>

          <Prompt>
            <PromptUser>toky</PromptUser>
            <PromptAt>@</PromptAt>
            <PromptDir>portfolio</PromptDir>
            <PromptSym>:~$&nbsp;</PromptSym>
            <Input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            <Cursor />
          </Prompt>
        </Window>
      )}
    </>
  );
}
