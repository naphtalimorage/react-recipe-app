import Home from "./components/Home.tsx"
import Blog from "./components/Blog.tsx"
import {Route,Routes} from "react-router-dom";
import MenuBar from "./components/Menubar.tsx";
import Navbar from "./components/Navbar.tsx";
import Button from '@mui/material/Button';
import AboutUs from "./components/About.tsx";
import Favourites from "./components/Favourites.tsx";
import Profile from "./components/Profile.tsx";
import SearchPage from "./components/SearchResultPage.tsx";
import RecipeDetails from "./components/RecipeDetails.tsx";
import Login from "./components/auth/Login.tsx";
import Signup from "./components/auth/Signup.tsx";
import { ToastContainer } from 'react-toastify';
import ForgotPassword from "./components/auth/ForgotPassword.tsx";
import ResetPassword from "./components/auth/ResetPassword.tsx";
import {ProtectedRoute} from "./components/ProtectedRoutes.tsx";
import {useAuth} from "./components/AuthContext.tsx";




function App() {
    const {isAuthenticated,logout}=useAuth()
    const handleClick = () => {
      logout()
    }

  return (
    <div className="flex flex-col lg:flex-row">
        {isAuthenticated && (
            <div className="p-3 hidden sm:block justify-center items-center h-screen top-[5.23rem] grow gap-5 max-w-7xl mx-auto">
                <h1 className="text-center font-bold">Logo Here</h1>
                <Navbar className="sticky h-fit flex flex-col space-y-3 py-5 bg-card" />
                <Button
                    className="text-white w-full flex top-60"
                    color="success"
                    variant="contained"
                    onClick={handleClick}
                >
                    Logout
                </Button>
            </div>
        )}
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<AboutUs/>}/>
              <Route path="/favourites" element={<Favourites/>}/>
              <Route path="/blog" element={<Blog/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/search" element={<SearchPage/>}/>
              <Route path="/details" element={<RecipeDetails/>}/>
          </Route>
        </Routes>
        <ToastContainer />
        {isAuthenticated && (
        <MenuBar className="fixed bottom-0 left-0 w-full grid grid-cols-5 justify-center gap-5 border-t sm:hidden p-3 bg-card" />
        )}
    </div>
  )
}

export default App
