import express from "express";
import {
  CreateUserRolesRouter,
  DeleteUserRolesRouter,
  ReadeUserRoleRouter,
  UpdateUserRolesRouter,
} from "../controllers/userRoles.controllers.js";

const UserRolesRouter = express.Router();

//Read Users Data
UserRolesRouter.get("/userspermission/readuserroles", ReadeUserRoleRouter);

//Create Users Data
UserRolesRouter.post("/userspermission/createuserroles", CreateUserRolesRouter);

//Update Users Data
UserRolesRouter.put("/userspermission/updateuserroles", UpdateUserRolesRouter);

//Delele User Data
UserRolesRouter.delete(
  "/userspermission/deleteuserroles",
  DeleteUserRolesRouter
);

export default UserRolesRouter;
