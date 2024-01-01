import { Navigate, Outlet } from 'react-router-dom';

const useAuth=()=>{

  const user=localStorage.getItem('USER_KEY');
  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=(props) =>{

  const auth=useAuth();
  const userType = localStorage.getItem('USER_TYPE');
  if(userType && userType === 'ADMIN'){
    return userType?<Navigate to="/adminDashboard"/>: <Outlet/>
  }else{
    return auth?<Navigate to="/dashboard"/>: <Outlet/>
  }
  
}

export default PublicRoutes;
