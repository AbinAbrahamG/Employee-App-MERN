const express = require('express');
const router = express.Router();
router.use(express.json());
const userModel = require('../model/userModel');
const jwt=require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const user=await userModel.findOne({email:req.body.email});
    if(!user){
        res.status(404).send({message:'Invalid Email'});
    }
    try{
        if(user.password==req.body.password){
            const payload={email:user.email,role: user.role};
            const tkn=jwt.sign(payload,'employeeApp');
            res.status(200).send({message:'Login Successfull',token:tkn,role: user.role});
        }
        else{
            res.status(404).send({message:'Invalid Credentials'});
        }
    } catch(err){
        console.log(err);
    }
});

module.exports = router;