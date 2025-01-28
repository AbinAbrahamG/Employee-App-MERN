const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeID: Number,
    employeeName: String,
    employeeDesignation: String,
    employeeSalary: Number,
    employeeDepartment: String,
    employeeLocation: String
});

const employeeModel = mongoose.model('employee',employeeSchema);
module.exports = employeeModel;