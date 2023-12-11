import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { fetchUserData } from '../api/authenticationService';



const MainWrapper=styled.div`
    padding-top:40px;
`;

const Dashboard=(props)=>{
  const navigate=useNavigate();
    const [data,setData]=useState({});
    console.log("enter");
    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
        }).catch((e)=>{
            localStorage.clear();
            navigate('/');
        })
    },[])

    const logOut=()=>{

        localStorage.clear();
        navigate('/');

    }

    return (
        <Container>
            <MainWrapper>
                <h4>Hello {data && `${data.email} ${data.loginCounter}`}</h4>

                <Button style={{marginTop:'5px'}} onClick={() =>logOut()}>Logout</Button>
            </MainWrapper>
        </Container>
    )
}

export default Dashboard;