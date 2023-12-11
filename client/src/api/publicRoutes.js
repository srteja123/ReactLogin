

import { Navigate, Outlet } from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('USER_KEY')
  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=(props) =>{

  const auth=useAuth()

  return auth?<Navigate to="/dashboard"/>: <Outlet/>
}

export default PublicRoutes;