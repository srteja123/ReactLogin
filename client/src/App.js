import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./api/publicRoutes";
import AddUserModal from "./pages/AddUser";
import AdminDashBoard from "./pages/AdminDashBoard";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Reg";


//Below code is used for routing purpose for login,register and dashboard
//Public Routes is used to allow users to navigate to dashboard once they have the token
function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<PublicRoutes/>}>
          <Route path="/" element={<LoginPage/>}/>
        </Route>
          <Route path="/register" element={<RegisterPage />}>
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
          </Route>
          <Route path="/adminDashboard" element={<AdminDashBoard />}>
          </Route>
          <Route path="/AddUserModal" element={<AddUserModal />}>
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
