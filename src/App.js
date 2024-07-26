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
import ChangeUserPicture from './components/features/ChangeUserPicture/ChangeUserPicture';
import ChangeUserPassword from './components/features/ChangeUserPassword/ChangeUserPassword';
import DeleteUserPage from './components/features/DeleteUserPage/DeleteUserPage';
import UserPosts from './components/pages/UserPosts/UserPosts.js';
import UserComments from './components/pages/UserComments/UserComments.js';
import AddEditPost from './components/features/AddEditPost/AddEditPost.js';
import EditComment from './components/features/EditComment/EditComment.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgottenPassword from './components/features/ForgottenPassword/ForgottenPassword.js';
import ResetPassword from './components/features/ResetPassword/ResetPassword.js';
import { getUserData } from './components/utils/users.js';
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch();

  const { token, removeToken, setToken } = useToken();
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    document.title = settings.title;
    //window.location.reload();
  }, []);

  if (localStorage.token) {
    getUserData(dispatch);
  }

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <main>
      <NavBar token={token} setToken={setToken} removeToken={removeToken}/>
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
            <Route path="/userposts" element={<UserPosts token={token} setToken={setToken} />} />
            <Route path="/addeditpost" element={<AddEditPost token={token} setToken={setToken} />} />
            <Route path="/addeditpost/:postId" element={<AddEditPost token={token} setToken={setToken} />} />
            <Route path="/editcomment/:commentId" element={<EditComment token={token} setToken={setToken} />} />
            <Route path="/usercomments" element={<UserComments token={token} setToken={setToken} />} />
            <Route path="/createuser" element={<CreateUserPage token={token} setToken={setToken} />} />
            <Route path="/changeuserdetails" element={<ChangeUserDetails token={token} setToken={setToken} />} />
            <Route path="/changeuserpicture" element={<ChangeUserPicture token={token} setToken={setToken} />} />
            <Route path="/changeuserpassword" element={<ChangeUserPassword token={token} setToken={setToken} />} />
            <Route path="/deleteuserpage" element={<DeleteUserPage token={token} setToken={setToken} />} />

            <Route path="/forgottenpassword" element={<ForgottenPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />

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
      <ToastContainer
        className="toast-container"
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
/>
    </main>
  );
}

export default App;