const catchAsync= require("../utils/catch.async.error");
const User = require("../models/user.model");


const filterObj = (obj,...toRemain)=>{
    const filteredObj = {};
    Object.keys(obj).forEach((el)=>{
        if(toRemain.includes(el)) filteredObj[el] = obj[el]; 
    });

    return filteredObj;
}

exports.getUsers = catchAsync( async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
});

exports.updateMe = catchAsync( async (req,res,next)=>{

    const filteredBody = filterObj(req.body,'name','email');

    const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
});

exports.deleteMe = catchAsync( async (req,res,next)=>{

    await User.findByIdAndUpdate(req.user.id,{ active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});