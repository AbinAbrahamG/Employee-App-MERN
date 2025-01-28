require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
app.use(cors());
app.use(morgan('dev'));

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

require('./db/connection');

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
