import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
  SCId: { type: Number },
  CId: { type: Number },
  SubCategory: {
    type: String,
  },
  Category: { type: String },
  DisplayOrder: { type: Number },
  Status: {
    type: Boolean,
  },
});

//Create Your Model
const SubCategory = model("subCategory", schema);

export default SubCategory;
