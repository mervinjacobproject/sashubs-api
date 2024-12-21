import express from "express";
import UserRouter from "./router/Users.routers.js";
import ParentCategoryRouter from "./router/ParentCategory.routers.js";
import connectDB from "./lib/db.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import AWSCognitoAuthRouters from "./router/AWSCognitoAuth.routers.js";
import SubCategoryRouter from "./router/SubCategory.routers.js";
import UserRolesRouter from "./router/UserRole.routers.js";
import UrlMasterRouter from "./router/UrlMaster.routers.js";
import RolePermissionRouter from "./router/rolePermission.router.js";

dotenv.config();

const app = express();
const PORT = 3500;

// Connect to the database
connectDB();

// Middleware for handling CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
  })
);

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Index route
app.get("/api", (req, res) => {
  res.json({ msg: "hello World!!" });
});

//AWS Cognito Auth
app.use("/api", AWSCognitoAuthRouters);

// User API routes
app.use("/api", UserRouter);

// Parent Category API routes
app.use("/api", ParentCategoryRouter);

// Sub Category API routes
app.use("/api", SubCategoryRouter);

//User Roles API route
app.use("/api", UserRolesRouter);

//Url Master API route
app.use("/api", UrlMasterRouter);

//Role Permission
app.use("/api", RolePermissionRouter);

app.listen(PORT, () => {
  console.log(`The server running at http://localhost:${PORT}`);
});

// //AWS Uploade
// import express from "express";
// import UserRouter from "./router/Users.routers.js";
// import ParentCategoryRouter from "./router/ParentCategory.routers.js";
// import connectDB from "./lib/db.js";
// import dotenv from "dotenv";
// import awsServerlessExpress from "aws-serverless-express";

// dotenv.config();

// const app = express();

// // Connect to the database
// connectDB();

// // Middleware for parsing request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Index route
// app.get("/api", (req, res) => {
//   res.json({ msg: "hello World!!" });
// });

// // User API routes
// app.use("/api", UserRouter);

// // Parent Category API routes
// app.use("/api", ParentCategoryRouter);

// // Create the server for AWS Lambda
// const server = awsServerlessExpress.createServer(app);

// // Lambda handler function
// export const handler = (event, context) => {
//   return awsServerlessExpress.proxy(server, event, context);
// };
