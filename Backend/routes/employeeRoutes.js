const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const employeeModel = require('../model/employeeModel');
router.use(express.json());
router.use(express.urlencoded({extended:true}));

function verifytoken(req,res,next){
    let token=req.headers.token;
    try {
        if(!token) throw 'Unauthorized access';
        else{
            let payload=jwt.verify(token,'employeeApp');
            if(!payload) throw 'Unauthorized access';
            req.user=payload;
            next();
        }
    } catch (error) {
        res.status(404).send('Unauthorized access');
    }
}

function verifyAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(404).send('Forbidden: Admins only');
    }
    next();
}

//Read
router.get('/', verifytoken, async (req, res) => {
    try {
        const data = await employeeModel.find();
        res.send(data);
    } catch (error) {
        res.send("Failed to fetch data");
    }
});

//Create
router.post('/add', verifytoken, verifyAdmin, async (req, res) => {
    try {
        const data = new employeeModel(req.body);
        await data.save();
        res.send('Employee added successfully');
    } catch (error) {
        res.send("Failed to add Employee");
    }
});

//Update
router.put('/update/:id', verifytoken, verifyAdmin, async (req,res) => {
    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.id,req.body);
        if(!updatedEmployee){
            return res.send('Employee not found')
        }
        res.send("Employee details updated successfully")
    } catch (error) {
        res.send('Failed to update Employee details')
    }
});

//Delete
router.delete('/delete/:id', verifytoken, verifyAdmin, async (req, res) => {
    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.send('Employee not found');
        }
        res.send('Employee deleted successfully');
    } catch (error) {
        res.send('Failed to delete Employee');
    }
});

module.exports = router;