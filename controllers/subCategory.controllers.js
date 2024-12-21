import ParentCategory from "../model/parentCategory.model.js";
import GetSubCategory from "../model/subCategory.model.js";

//Read Users Data
export const ReadeSubCategoryRouter = async (req, res) => {
  try {
    const { CId, SCId, SubCategory, Status } = req.query;
    let query = {};
    if (SCId) query.SCId = Number(SCId);
    if (CId) query.CId = Number(CId);
    if (SubCategory) query.SubCategory = { $regex: SubCategory, $options: "i" };
    if (Status) query.Status = Status === "true";
    const GetUsers = await GetSubCategory.find(query);
    res.json(GetUsers.sort((a, b) => a.DisplayOrder - b.DisplayOrder));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Users Data
export const CreateSubCategoryRouter = async (req, res) => {
  const GetUsers = await GetSubCategory.find();
  const GetParentCategory = await ParentCategory.find({
    CId: Number(req.body.CId),
  });
  const sort = (await GetUsers.sort((a, b) => b.SCId - a.SCId)) || [];
  //Validate Your Data
  const newSubCategory = new GetSubCategory({
    SCId: Number(sort.length > 0 ? sort[0]?.SCId + 1 : 1),
    CId: Number(req.body.CId),
    SubCategory: req.body.SubCategory,
    Status: req.body.Status,
    DisplayOrder: req.body.DisplayOrder,
    Category: GetParentCategory[0].Category,
  });
  try {
    const subCategory = await newSubCategory.save();

    return res
      .status(200)
      .json({ message: `Successfully Create the Sub Category:!!` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Update Users Data
export const UpdateSubCategoryRouter = async (req, res) => {
  const FindCId = Number(req.body.SCId);
  const UpdateParentCategoryValue = req.body;
  const GetParentCategory = await ParentCategory.find({
    CId: Number(req.body.CId),
  });
  if (!req.body.SCId) {
    return res.status(400).send("CId is required");
  }

  try {
    const updateParentCategory = await GetSubCategory.findOneAndUpdate(
      { SCId: FindCId },
      {
        Category: GetParentCategory[0].Category,
        CId: GetParentCategory[0].CId,
        Status: req.body.Status,
        SubCategory: req.body.SubCategory,
        DisplayOrder: req.body.DisplayOrder,
      },
      { new: true }
    );
    if (!UpdateParentCategoryValue) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: `Successfully Update the Parent Category:!!` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delele User Data
export const DeleteSubCategoryRouter = async (req, res) => {
  const FindCIds = JSON.parse(req.body.SCId);

  if (!FindCIds) {
    return res
      .status(400)
      .json({ message: "SCIds is required and should be an array" });
  }

  try {
    const DeleteUser = await GetSubCategory.deleteMany({
      SCId: { $in: FindCIds },
    });

    if (DeleteUser.deletedCount === 0) {
      return res.status(404).json("No users found to delete");
    }

    res.status(200).json({
      message: `${DeleteUser.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users: " + error.message });
  }
};
