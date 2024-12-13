import Users from "../model/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Read Users Data
export const ReadeUser = async (req, res) => {
  try {
    let query = {};
    const GetUsers = await Users.find(query);
    res.json(GetUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Users Data
export const CreateUser = async (req, res) => {
  const GetUsers = await Users.find();
  const sort = (await GetUsers.sort((a, b) => b.UserId - a.UserId)) || [];

  const hashedPassword = await bcrypt.hash(req.body.Password, 10);

  //Validate Your Data
  const newUser = new Users({
    UserId: Number(sort.length > 0 ? sort[0]?.UserId + 1 : 1),
    UserName: req.body.UserName,
    Email: req.body.Email,
    Password: hashedPassword,
    IpAddress: req.body.IpAddress,
    PhoneNo: req.body.PhoneNo,
    Status: req.body.Status,
  });
  try {
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    // return res.status(400).json({ message: error.message });
  }
};

//Update Users Data
export const UpdateUser = async (req, res) => {
  const FindUserId = String(req.body.Email);
  const UpdateUserValue = req.body;

  // if (!req.body.Email) {
  //   return res.status(400).send("userId is required");
  // }

  try {
    const updateUser = await Users.findOneAndUpdate(
      { Email: FindUserId },
      UpdateUserValue,
      { new: true }
    );
    // if (!UpdateUserValue) {
    //   return res.status(404).send("User not found");
    // }
    res.status(200).json(updateUser);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    // return res.status(404).send("User not found");
  }
};

//Delele User Data
export const DeleteUser = async (req, res) => {
  const FindUserIds = JSON.parse(req.body.UserIds);

  if (!FindUserIds || !Array.isArray(FindUserIds)) {
    return res.status(400).send("userIds is required and should be an array");
  }

  try {
    const DeleteUser = await Users.deleteMany({
      UserId: { $in: FindUserIds },
    });

    if (DeleteUser.deletedCount === 0) {
      return res.status(404).send("No users found to delete");
    }

    res.send(`${DeleteUser.deletedCount} users deleted successfully`);
  } catch (error) {
    res.status(500).send("Error deleting users: " + error.message);
  }
};

//Create UserLogin
export const UserLogin = async (req, res) => {
  const { Email, Password } = req.body;

  // Check if both email and password are provided
  if (!Email || !Password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  try {
    // Find the user by email
    const user = await Users.findOne({ Email });

    // If user not found, send an error response
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { UserId: user.UserId, Email: user.Email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRATION } // Expiration time
    );

    // Send back user information and token on successful login
    res.status(200).json({
      message: "Login successful",
      user: {
        UserId: user.UserId,
        Email: user.Email,
        UserName: user.UserName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
