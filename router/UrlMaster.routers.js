import express from "express";
import {
  CreateUrlMasterRouter,
  DeleteUrlMasterRouter,
  ReadeUrlMasterRouter,
  UpdateUrlMasterRouter,
} from "../controllers/urlMaster.controllers.js";

const UrlMasterRouter = express.Router();

//Read Users Data
UrlMasterRouter.get("/userspermission/readurlmaster", ReadeUrlMasterRouter);

//Create Users Data
UrlMasterRouter.post("/userspermission/createurlmaster", CreateUrlMasterRouter);

//Update Users Data
UrlMasterRouter.put("/userspermission/updateurlmaster", UpdateUrlMasterRouter);

//Delele User Data
UrlMasterRouter.delete(
  "/userspermission/deleteurlmaster",
  DeleteUrlMasterRouter
);

export default UrlMasterRouter;
