import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import axiosInstance from '../axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { decode } from 'jwt-decode';

const Home = () => {
  const[cardData,setData]=useState([]);
  const[role,setRole]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    axiosInstance.get('http://localhost:3000/employees').then((res)=>{
      setData(res.data);
    }).catch((err)=>{
      console.log(err);
    });

    const token = sessionStorage.getItem('logintoken');
    if (token) {
      const decodedToken = decode(token);
      setRole(decodedToken.role);
    }
  },[])
  function update_data(val){
    navigate('/addemployee',{state:{val}});
  }
  function handleDelete(val) {
    axiosInstance.delete('http://localhost:9000/employees/deleteemployee/' + val._id).then((res) => {
      alert(res.data);
      setData(cardData.filter(item => item._id !== val._id));
    }).catch((err) => {
      console.log(err);
    });
  }
    // const cardData=[{title:'Food Blog',description:'Good Food',image:'https://images.unsplash.com/photo-1559095240-55a16b2dda6a?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}, 
    //     {title:'Movie Blog',description:'Good Movie',image:'https://previews.123rf.com/images/sonulkaster/sonulkaster1203/sonulkaster120300037/12819991-illustration-of-movie-theme-objects-on-red-background.jpg'}, 
    //     {title:'Travel Blog',description:'Travel!!!',image:'https://media.istockphoto.com/id/692862134/vector/world-travel-photo-planning-summer-vacations-holiday-journey-tourism-and-vacation-theme.jpg?s=612x612&w=0&k=20&c=hH6WR9hoVdeoVqE2Rrzy_-9GTJevyqeRf9IV1CclCD4='}]
  return (
    <div style={{margin:'5%'}}>
      <Grid container spacing={2}>
        {cardData.map((row)=>(
          <Grid size={4}>
            <List sx={{ bgcolor: 'purple' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={row.employeeName} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography gutterBottom variant="h5" component="div">{row.employeeName}</Typography>
                      <Typography variant="body1">{row.employeeID}</Typography>
                      <Typography variant="body1">{row.employeeDesignation}</Typography>
                      <Typography variant="body1">{row.employeeSalary}</Typography>
                      <Typography variant="body1">{row.employeeDepartment}</Typography>
                      <Typography variant="body1">{row.employeeLocation}</Typography>
                      {role === 'admin' && (
                        <>
                          <Button size="small" variant='contained' color='warning' onClick={() => update_data(row)}>Update</Button>
                          <Button size="small" variant='contained' color='error' onClick={() => handleDelete(row)} style={{ marginLeft: '3px' }}>Delete</Button>
                        </>
                      )}
                      {/* <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}>
                      </Typography>*/}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;