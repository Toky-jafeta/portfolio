import './App.css';
import TerminalWidget from '../common/component/TerminalWidget';
import Header from '../common/component/header';
import ScrollProgress from '../common/component/ScrollProgress';
import Footer from '../common/component/Footer';
import Hero from '../features/hero/Hero';
import About from '../features/about/About';
import Expertise from '../features/expertise/Expertise';
import Realisations from '../features/realisation/realisation';
import Services from '../features/service/service';
import Experiences from '../features/experiences/experiences';
import Certifications from '../features/certifications/Certifications';
import Contact from '../features/contact/contact';

function App() {
  return (
    <div className="App">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Realisations />
        <Services />
        <Experiences />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <TerminalWidget />
    </div>
  );
}

export default App;
