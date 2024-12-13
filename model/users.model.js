import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
  UserId: { type: Number },
  UserName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  IpAddress: { type: String },
  PhoneNo: { type: Number },
  Status: {
    type: Boolean,
  },
});

//Create Your Model

const Users = model("Users", schema);

export default Users;
