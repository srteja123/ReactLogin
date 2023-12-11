import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import NoPage from "./pages/NoPage";
import RegisterPage from "./pages/Reg";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />}>
            <Route path="/user/login"  element={<LoginPage />} />
            <Route path="/dashboard/view" element={<Dashboard />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
