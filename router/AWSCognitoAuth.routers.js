import express from "express";
import {
  AuthLogin,
  ResendOtp,
  UserSignUp,
  VerifyEmailOtp,
} from "../controllers/AWSCognitoAuth.controllers.js";

const AWSCognitoAuthRouters = express.Router();

//USER LOGIN (AUTHENTICATION)
AWSCognitoAuthRouters.post("/auth/login", AuthLogin);

//UserSignUp
AWSCognitoAuthRouters.post("/auth/signup", UserSignUp);

//VERIFY EMAIL OTP
AWSCognitoAuthRouters.post("/auth/verify-otp", VerifyEmailOtp);

//Resend OTP
AWSCognitoAuthRouters.post("/auth/resend-otp", ResendOtp);

export default AWSCognitoAuthRouters;
