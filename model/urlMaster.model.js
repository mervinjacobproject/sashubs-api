import { model, Schema } from "mongoose";

const schema = new Schema({
  Id: { type: Number },
  MasterName: { type: String },
  Icon: { type: String },
  Url: { type: String },
  Status: { type: Boolean },
  DisplayOrder: { type: Number },
  Childof: { type: Number },
  MainMasterName: { type: String },
});

//Create your UrlMaster
const UrlMaster = model("urlMaster", schema);

export default UrlMaster;
