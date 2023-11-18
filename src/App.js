import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AboutPage from './components/pages/AboutPage/AboutPage';
import SearchPage from './components/pages/SearchPage/SearchPage';

const App = () => {
  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="*" element={<AboutPage />} />
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;