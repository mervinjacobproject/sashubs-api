import AWS from "aws-sdk";
import crypto from "crypto";
import dotenv from "dotenv";
import { CreateUser, UpdateUser } from "./user.controllers.js";
import Users from "../model/users.model.js";

dotenv.config();

// AWS Cognito Configuration
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Function to Generate SECRET_HASH
function generateSecretHash(username, clientId, clientSecret) {
  return crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}

const cognito = new AWS.CognitoIdentityServiceProvider();

// USER LOGIN (AUTHENTICATION)
export const AuthLogin = async (req, res) => {
  const { email, password } = req.body;
  const Email = String(req.body.email);
  const clientId = process.env.COGNITO_APP_CLIENT_ID;
  const clientSecret = process.env.COGNITO_APP_CLIENT_SECRET;
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_APP_CLIENT_ID, // Your App Client ID
    AuthParameters: {
      USERNAME: email, // Email as username
      PASSWORD: password, // User password
      SECRET_HASH: generateSecretHash(email, clientId, clientSecret),
    },
  };

  try {
    // Authenticate user
    const result = await cognito.initiateAuth(params).promise();
    const user = await Users.findOne({ Email });
    // Extract tokens
    const { AccessToken, IdToken, RefreshToken } = result.AuthenticationResult;

    res.status(200).json({
      message: "Login successful",
      accessToken: AccessToken,
      idToken: IdToken,
      refreshToken: RefreshToken,
      userData: {
        UserId: user.UserId,
        Email: user.Email,
        UserName: user.UserName,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(401).json({
      error: "Authentication failed",
      details: err.message,
    });
  }
};

// USER SIGNUP (EMAIL ONLY)
export const UserSignUp = async (req, res) => {
  const { email, password } = req.body;

  const clientId = process.env.COGNITO_APP_CLIENT_ID;
  const clientSecret = process.env.COGNITO_APP_CLIENT_SECRET;

  const params = {
    ClientId: clientId,
    Username: email, // Using email as the unique username
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
    SecretHash: generateSecretHash(email, clientId, clientSecret),
  };
  const ForUserTable = {
    body: { Email: email, Password: password, Status: false },
  };
  try {
    const result = await cognito.signUp(params).promise();
    CreateUser(ForUserTable);
    res.status(201).json({
      message: "User created successfully. Check your email for the OTP.",
      data: result,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: err.message });
  }
};

//VERIFY EMAIL OTP
export const VerifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  const clientId = process.env.COGNITO_APP_CLIENT_ID;
  const clientSecret = process.env.COGNITO_APP_CLIENT_SECRET;

  const params = {
    ClientId: clientId,
    SecretHash: generateSecretHash(email, clientId, clientSecret), // Include SECRET_HASH
    Username: email,
    ConfirmationCode: otp, // OTP code to verify
  };
  const ForUserTable1 = {
    body: { Email: email, Status: true },
  };
  try {
    await cognito.confirmSignUp(params).promise();
    res.status(200).json({
      message: "Email verified successfully.",
    });
    UpdateUser(ForUserTable1);
  } catch (err) {
    console.error("OTP Verification Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// RESEND OTP
export const ResendOtp = async (req, res) => {
  const { email } = req.body;
  const clientId = process.env.COGNITO_APP_CLIENT_ID;
  const clientSecret = process.env.COGNITO_APP_CLIENT_SECRET;
  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    Username: email,
    SecretHash: generateSecretHash(email, clientId, clientSecret),
  };

  try {
    await cognito.resendConfirmationCode(params).promise();
    res.status(200).json({
      message: "OTP resent successfully. Check your email.",
    });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ error: err.message });
  }
};
