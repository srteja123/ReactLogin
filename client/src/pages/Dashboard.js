import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { fetchUserData } from '../api/authenticationService';



const MainWrapper=styled.div`
    padding-top:40px;
`;

const Dashboard=()=>{
  const navigate=useNavigate();
    const [data,setData]=useState({});
    React.useEffect(()=>{
   //if some one is trying to access /dashboard without token redirect them to login page
        if(localStorage.getItem('USER_KEY') == null){
            navigate('/');
        }else{
            fetchUserData().then((response)=>{
                setData(response.data);
            }).catch((e)=>{
                localStorage.clear();
                navigate('/');
            })
        }
    },[navigate])

    const logOut=()=>{

        localStorage.clear();
        navigate('/');

    }

    return (
        <Container>
            <MainWrapper>
                <h4 data-testid="display-text">Hello {data && `${data.email}` }</h4>
                <h4>Login Counter : {data && `${data.loginCounter}`}</h4>

                <Button style={{marginTop:'5px'}} onClick={() =>logOut()}>Logout</Button>
            </MainWrapper>
        </Container>
    )
}

export default Dashboard;
