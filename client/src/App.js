import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./api/publicRoutes";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Reg";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          
        <Route path="/" element={<PublicRoutes/>}>
          <Route path="/" element={<LoginPage/>}/>
        </Route>
          <Route path="/register" element={<RegisterPage />}>         
          </Route>
          <Route path="/dashboard/*" element={<Dashboard />}>         
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
