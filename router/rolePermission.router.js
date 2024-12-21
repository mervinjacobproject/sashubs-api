import express from "express";
import {
  CreateRolesPermissionRouter,
  DeleteRolePermission,
  ReadeRolePermissionRouter,
  UpdateRolePermissionRouter,
} from "../controllers/rolePermmision.controllers.js";

const RolePermissionRouter = express.Router();

//Read Users Data
RolePermissionRouter.get(
  "/userspermission/readrolepermission",
  ReadeRolePermissionRouter
);

//Create Users Data
RolePermissionRouter.post(
  "/userspermission/createrolepermission",
  CreateRolesPermissionRouter
);

//Update Users Data
RolePermissionRouter.put(
  "/userspermission/updaterolepermission",
  UpdateRolePermissionRouter
);

//Delele User Data
RolePermissionRouter.delete(
  "/userspermission/deleterolepermission",
  DeleteRolePermission
);

export default RolePermissionRouter;
