import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    employeeID: '',
    employeeName: '',
    employeeDesignation: '',
    employeeSalary: '',
    employeeDepartment: '',
    employeeLocation: ''
  });

  const navigate=useNavigate();
  const location=useLocation();

  function capValue(){
    if (location.state!=null) {
      axiosInstance.put(`http://localhost:3000/employees/update/`+location.state.val._id,employee).then((res)=>{
      alert(res.data);
      navigate('/admin');
    })
    .catch((err)=>{
      alert('Error updating employee');
    })
  } else {
    if (
      !employee.employeeID ||
      !employee.employeeName ||
      !employee.employeeDesignation ||
      !employee.employeeSalary ||
      !employee.employeeDepartment ||
      !employee.employeeLocation
    ) {
      alert("Fill in all fields before submitting.");
      return; 
    }
    
  axiosInstance.post('http://localhost:3000/employees/add', employee)
      .then((res) => {
        alert(res.data);
        navigate('/admin');
      })
      .catch((error) => {
        alert('Error adding employee');
      });
    }
  }

  useEffect(()=>{
    if (location.state!=null) {
      setEmployee({...employee,
        employeeID:location.state.val.employeeID,
        employeeName:location.state.val.employeeName,
        employeeDesignation:location.state.val.employeeDesignation,
        employeeSalary:location.state.val.employeeSalary,
        employeeDepartment:location.state.val.employeeDepartment,
        employeeLocation:location.state.val.employeeLocation
      });
    } else {
      setEmployee({...employee,
        employeeID:'',
        employeeName:'',
        employeeDesignation:'',
        employeeSalary:'',
        employeeDepartment:'',
        employeeLocation:''
      })
    }
  },[]);

  return (
    <div>
      <Box
      sx={{
        marginTop: '8%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        textAlign: 'center',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography style={{fontWeight:'bold'}} variant="h4" gutterBottom color="red">
        {location.state ? 'EDIT EMPLOYEE' : 'ADD NEW EMPLOYEE' }
      </Typography>

      <form>
        <TextField
          label="Employee ID"
          name="employeeID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.employeeID}
          onChange={(e)=>setEmployee({ ...employee, employeeID: e.target.value })}
        />

        <TextField
          label="Name"
          name="employeeName"
          variant="outlined"
          fullWidth
          margin="normal"
          // multiline
          // rows={4}
          value={employee.employeeName}
          onChange={(e)=>setEmployee({ ...employee, employeeName: e.target.value })}
        />

        <TextField
          label="Designation"
          name="employeeDesignation"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.employeeDesignation}
          onChange={(e)=>setEmployee({...employee, employeeDesignation:e.target.value})}
        />
        
        <TextField
          label="Salary"
          name="employeeSalary"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.employeeSalary}
          onChange={(e)=>setEmployee({...employee, employeeSalary:e.target.value})}
        />
        
        <TextField
          label="Department"
          name="employeeDepartment"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.employeeDepartment}
          onChange={(e)=>setEmployee({...employee, employeeDepartment:e.target.value})}
        />
        
        <TextField
          label="Location"
          name="employeeLocation"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employee.employeeLocation}
          onChange={(e)=>setEmployee({...employee, employeeLocation:e.target.value})}
        />

        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ marginTop: 2 }}
          fullWidth
          onClick={capValue}>
          {location.state ? 'UPDATE EMPLOYEE' : 'ADD EMPLOYEE' }
        </Button>
      </form>
    </Box>
    </div>
  )
}

export default AddEmployee