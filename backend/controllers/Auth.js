/* eslint-disable no-undef */
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    //fetch data from req body
    const { Username, email, password, confirmPassword } = req.body;
    //validate data
    if (!Username || !email || !password || !confirmPassword) {
      return res.status(401).json({
        sucess: false,
        message: "all fields are required",
      });
    }
    const checkUserPresent = await User.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(401).json({
        sucess: false,
        message: "User already exists",
      });
    }
    // match both password
    if (password !== confirmPassword) {
      return res.status(401).json({
        sucess: false,
        message: "Passwords do not match",
      });
    }
    // check user is alredy exist or not

    //find most recent otp from db
    // const recentOtp = await OTP.find({ email })
    //   .sort({ createdAt: -1 })
    //   .limit(1);

    // console.log(recentOtp[0].otp !== otp);
    //validate otp(match)
    // if (recentOtp[0].otp.length == 0) {
    //   return res.status(401).json({
    //     sucess: false,
    //     message: "otp not found",
    //   });
    // } else if (recentOtp[0].otp !== otp) {
    //   return res.status(401).json({
    //     sucess: false,
    //     message: "Invalid otp",
    //   });
    // }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create entry in db
    // const profileDetails = await Profile.create({
    //   gender: null,
    //   dateOfBirth: null,
    //   about: null,
    //   profession: null,
    // });
    const user = await User.create({
      Username,
      email,
      password: hashedPassword,
    });
    const payload = {
      email: user.email,
      id:user._id,
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:"5h"
     })
     user.token=token;
     const options = {
      expires:new Date(Date.now() + 3*24*60*60*1000),
      httpOnly: true
     }
    res.cookie("token",token,options).status(200).json({
      sucess:true,
      token,
      user,
      message:"user login successfully"
     })
  
       
    //return res
    // return res.status(200).json({
    //   sucess: true,
    //   message: "user created successfully",
    //   user,
    // });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Email and password are required fields."
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist. Please register first."
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password."
      });
    }

    const payload = {
      email: user.email,
      id: user._id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h"
    });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      // Set secure:true if using HTTPS
      // secure: true,
      // Set sameSite to 'strict' for better security
      // sameSite: 'strict'
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user: {
        email: user.email,
        id: user._id
      },
      message: "User logged in successfully."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
