import express from "express";
import {
  CreateParentCategoryRouter,
  DeleteParentCategoryRouter,
  ReadeParentCategoryRouter,
  UpdateParentCategoryRouter,
} from "../controllers/paarentCategory.controllers.js";

const ParentCategoryRouter = express.Router();

//Read Users Data
ParentCategoryRouter.get(
  "/categories/parentcategoryread",
  ReadeParentCategoryRouter
);

//Create Users Data
ParentCategoryRouter.post(
  "/categories/createparentcategory",
  CreateParentCategoryRouter
);

//Update Users Data
ParentCategoryRouter.put(
  "/categories/updateparentcategory",
  UpdateParentCategoryRouter
);

//Delele User Data
ParentCategoryRouter.delete(
  "/categories/deleteparentcategory",
  DeleteParentCategoryRouter
);

export default ParentCategoryRouter;
