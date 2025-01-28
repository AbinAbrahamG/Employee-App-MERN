import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate();
  const userRole=sessionStorage.getItem('userRole');

  function SessionExpire(){
    sessionStorage.removeItem('logintoken');
    sessionStorage.removeItem('userRole');
    navigate('/');
    window.location.reload();
  }

  const handleHomeNavigation = () => {
    if (userRole === 'admin') {
      navigate('/admin'); 
    } else if (userRole === 'user') {
      navigate('/user');   
    } else {
      navigate('/');       
    }
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar style={{backgroundColor:'black'}}>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee App
          </Typography>
          <Button style={{ color: 'white' }} onClick={handleHomeNavigation}>Home</Button>
          {userRole === 'admin' && (
              <>
                <Link to="/addemployee">
                  <Button style={{ color: 'white' }}>Add Employee</Button>
                </Link>
              </>
            )}
          <Button style={{color:"white"}} onClick={SessionExpire}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default Navbar