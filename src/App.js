import React, {useState, useEffect, useContext} from 'react';
import "@fontsource/poppins/400.css"
import "@fontsource/open-sans/700.css"
import {
  ChakraProvider,
} from '@chakra-ui/react';
import {Routes, Route, BrowserRouter as Router, Navigate, Outlet} from "react-router-dom"
import theme from "./theme";
import Index from "./pages/Index"
import Recipes from "./pages/Recipes"
import Recipe from "./pages/Recipe"
import RecipeForm from "./pages/RecipeForm"
import Requests from "./pages/Requests"
import Ingredient from "./pages/Ingredient"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cookies from "js-cookie";
import AuthApi from './AuthApi';
require('dotenv').config()

function App() {
  const [auth, setAuth] = useState(false)

  const ReadCookies = () => {
      const user = Cookies.get("user");
      if(user){
          setAuth(true);
      }
  }

  useEffect(()=>{
      ReadCookies();
  }, []);

  return (
    <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
        <ChakraProvider theme={theme}>
          <Navigation />
        </ChakraProvider>
      </Router>
    </AuthApi.Provider>
  );
}

const Navigation = () => {
  return(
    <Routes>
      <Route exact path='/' element={<ProtectedRoute/>}>
        <Route exact path='/' element={<Index />}/>
      </Route>
      <Route exact path='/login' element={<ProtectedAuth/>}>
        <Route exact path='/login' element={<Login />}/>
      </Route>
      <Route exact path='/register' element={<ProtectedAuth/>}>
        <Route exact path='/register' element={<Register />}/>
      </Route>
      <Route exact path='/recipes' element={<ProtectedRoute/>}>
        <Route exact path='/recipes' element={<Recipes />}/>
      </Route>
      <Route exact path='/recipe' element={<ProtectedRoute/>}>
        <Route exact path='/recipe' element={<Recipe />}/>
      </Route>
      <Route exact path='/add-recipe' element={<ProtectedRoute/>}>
        <Route exact path='/add-recipe' element={<RecipeForm />}/>
      </Route>
      <Route exact path='/ingredients' element={<ProtectedRoute/>}>
        <Route exact path='/ingredients' element={<Ingredient/>}/>
      </Route>
      <Route exact path='/requests' element={<ProtectedRoute/>}>
        <Route exact path='/requests' element={<Requests/>}/>
      </Route>
    </Routes>
  )
}

const ProtectedRoute = ({ element : Element, ...rest}) => {
  const Auth = useContext(AuthApi)
  return Auth.auth ? <Outlet /> : <Navigate to="/login" />;
}
const ProtectedAuth = ({ element : Element, ...rest}) => {
  const Auth = useContext(AuthApi)
  return !Auth.auth ? <Outlet /> : <Navigate to="/" />;
}  

export default App;
