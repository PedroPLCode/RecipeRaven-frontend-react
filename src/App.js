import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainPage from './components/MainPage/MainPage';
import SearchInput from './components/SearchInput/SearchInput';
import SearchOutput from './components/SearchOutput/SearchOutput';
import PageNotFound from './components/PageNotFound/PageNotFound';

const App = () => {
  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchInput />} />
          <Route path="/results" element={<SearchOutput />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;