import './App.css';
import Home from '../features/home/home';
import Header from '../common/component/header';
import Apropos from '../features/apropos/apropos';
import Services from '../features/service/service';
import Experiences from '../features/experiences/experiences';
import Realisation from '../features/realisation/realisation'
import Error from '../common/component/error';
import Contact from '../features/contact/contact'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/apropos' element={<Apropos />} />
          <Route path='/services' element={<Services />} />
          <Route path='/experiences' element={<Experiences />} />
          <Route path='/realisations' element={<Realisation />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
