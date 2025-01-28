import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axiosInstance from '../axiosInterceptor';

const UserPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axiosInstance.get('http://localhost:3000/employees')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error('Error fetching employees:', err);
      });
  }, []);

  return (
    <div style={{ margin: '5%' }}>
      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid key={employee._id} item xs={12} sm={6} md={4}>  
            <Card sx={{ height: '200px',  
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',width: '300px', backgroundColor:'black',color:'white', marginTop:'25px' }}>
              <CardContent>
                <Typography style={{fontWeight:'bold'}} gutterBottom variant="h5" component="div">
                  {employee.employeeName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  Employee ID: {employee.employeeID}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  Position: {employee.employeeDesignation}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  Department: {employee.employeeDepartment}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  Salary: {employee.employeeSalary}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  Location: {employee.employeeLocation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserPage;