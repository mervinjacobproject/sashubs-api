import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
  CId: { type: Number },
  Category: {
    type: String,
  },
  DisplayOrder: { type: Number },
  Status: {
    type: Boolean,
  },
});

//Create Your Model
const ParentCategory = model("parentCategory", schema);

export default ParentCategory;
