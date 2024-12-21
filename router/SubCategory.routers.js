import express from "express";
import {
  CreateSubCategoryRouter,
  DeleteSubCategoryRouter,
  ReadeSubCategoryRouter,
  UpdateSubCategoryRouter,
} from "../controllers/subCategory.controllers.js";

const SubCategoryRouter = express.Router();

//Read Users Data
SubCategoryRouter.get("/categories/subcategoryread", ReadeSubCategoryRouter);

//Create Users Data
SubCategoryRouter.post(
  "/categories/createsubcategory",
  CreateSubCategoryRouter
);

//Update Users Data
SubCategoryRouter.put("/categories/updatesubcategory", UpdateSubCategoryRouter);

//Delele User Data
SubCategoryRouter.delete(
  "/categories/deletesubcategory",
  DeleteSubCategoryRouter
);

export default SubCategoryRouter;
