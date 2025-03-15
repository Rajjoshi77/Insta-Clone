import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./Layout/Pagelayout/PageLayout"
import HomePages from "./pages/HomePages/HomePages"
import AuthPage from "./pages/AuthPage/AuthPage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "./firebase/firebase";

function App() {
  const [authUser] = useAuthState(Auth);

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <HomePages /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/:username' element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;