import { React, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { settings } from './settings';
import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer';
import AboutPage from './components/pages/AboutPage/AboutPage';
import UserAccountPage from './components/pages/UserAccountPage/UserAccountPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import BoardPage from './components/pages/BoardPage/BoardPage'
import SearchPage from './components/pages/SearchPage/SearchPage';
import ErrorPage from './components/features/ErrorPage/ErrorPage';
import Loading from './components/features/Loading/Loading';
import ReadyToSearch from './components/features/ReadyToSearch/ReadyToSearch';
import NoResultsPage from './components/features/NoResultsPage/NoResultsPage';
import SearchResults from './components/features/SearchResults/SearchResults';
import Profile from './components/features/Profile/Profile.js'
import useToken from './components/features/useToken/useToken.js'
import CreateUserPage from './components/pages/CreateUserPage/CreateUserPage';
import ChangeUserDetails from './components/features/ChangeUserDetails/ChangeUserDetails';
import ChangeUserPassword from './components/features/ChangeUserPassword/ChangeUserPassword';

const App = () => {

  const { token, removeToken, setToken } = useToken();
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    document.title = settings.title;
    //window.location.reload();
  }, []);

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <main>
      <NavBar token={token} setToken={setToken} />
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
            <Route path="/favorites" element={<FavoritesPage token={token} setToken={setToken} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/login" element={<UserAccountPage />} />
            <Route exact path="/profile" element={<Profile token={token} setToken={setToken} />} />
            <Route path="/createuser" element={<CreateUserPage token={token} setToken={setToken} />} />
            <Route path="/changeuserdetails" element={<ChangeUserDetails token={token} setToken={setToken} />} />
            <Route path="/changeuserpassword" element={<ChangeUserPassword token={token} setToken={setToken} />} />
            <Route path="*/errorpage" element={<ErrorPage />} />
            <Route path="/loadingpage" element={<Loading />} />
            <Route path="/readypage" element={<ReadyToSearch />} />
            <Route path="/noresultspage" element={<NoResultsPage />} />
            <Route path="/resultspage" element={<SearchResults />} />
            <Route path="*" element={<SearchPage />} />
          </Routes>
        </div>
      </Container>
      <Footer />
    </main>
  );
}

export default App;