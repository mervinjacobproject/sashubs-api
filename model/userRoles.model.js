import { model, Schema } from "mongoose";

const schema = new Schema({
  Id: { type: Number },
  RoleName: { type: String },
  Status: { type: Boolean },
  DisplayOrder: { type: Number },
  Createdat: { type: String },
});

//Create your Model
const UserRoles = model("userRoles", schema);

export default UserRoles;
