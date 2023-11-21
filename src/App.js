import NavBar from './components/views/NavBar/NavBar'
import { React, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AboutPage from './components/pages/AboutPage/AboutPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import SearchPage from './components/pages/SearchPage/SearchPage';

import ErrorPage from './components/features/ErrorPage/ErrorPage';
import Loading from './components/features/Loading/Loading';

const App = () => {

  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <main>
      <NavBar />
      <Container>
      <div
            className={transitionStage}
            onAnimationEnd={() => {
              if (transitionStage === "fadeOut") {
                setTransistionStage("fadeIn");
                setDisplayLocation(location);
              }
            }}
          > 
        <Routes location={displayLocation}>
          <Route path="/favorite" element={<FavoritesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<SearchPage />} />

          <Route path="*/error" element={<ErrorPage />} />
          <Route path="/loading" element={<Loading />} />

        </Routes>
      </div>
      </Container>
    </main>
  );
}

export default App;