import { model, Schema } from "mongoose";

const schema = new Schema({
  Id: { type: Number },
  RoleId: { type: Number },
  MasterId: { type: Number },
  MasterName: { type: String },
  RoleName: { type: String },
  Read: { type: Boolean },
  Write: { type: Boolean },
  Delete: { type: Boolean },
});

//Create Your Role Permmision
const RolePermmission = model("rolePermission", schema);

export default RolePermmission;
