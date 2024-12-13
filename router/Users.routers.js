import express from "express";
import {
  ReadeUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  UserLogin,
} from "../controllers/user.controllers.js";

const UserRouter = express.Router();

//Read Users Data
UserRouter.get("/users/usersread", ReadeUser);

//Create Users Data
UserRouter.post("/users/createuser", CreateUser);

//Update Users Data
UserRouter.put("/users/updateuser", UpdateUser);

//Delele User Data
UserRouter.delete("/users/deleteusers", DeleteUser);

//User Login Api
UserRouter.post("/users/userlogin", UserLogin);

export default UserRouter;
