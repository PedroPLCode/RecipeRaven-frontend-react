import NavBar from './components/views/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AboutPage from './components/pages/AboutPage/AboutPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import SearchPage from './components/pages/SearchPage/SearchPage';

const App = () => {
  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/favorite" element={<FavoritesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<SearchPage />} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;