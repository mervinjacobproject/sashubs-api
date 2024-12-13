import ParentCategory from "../model/parentCategory.model.js";
//Read Users Data
export const ReadeParentCategoryRouter = async (req, res) => {
  try {
    let query = {};
    const GetUsers = await ParentCategory.find(query);
    res.json(GetUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Users Data
export const CreateParentCategoryRouter = async (req, res) => {
  const GetUsers = await ParentCategory.find();
  const sort = (await GetUsers.sort((a, b) => b.CId - a.CId)) || [];

  //Validate Your Data
  const newParentCategory = new ParentCategory({
    CId: Number(sort.length > 0 ? sort[0]?.CId + 1 : 1),
    Name: req.body.Name,
    Status: req.body.Status,
    DisplayOrder: req.body.DisplayOrder,
  });
  try {
    const parentCategory = await newParentCategory.save();
    return res.status(400).json(parentCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Update Users Data
export const UpdateParentCategoryRouter = async (req, res) => {
  const FindCId = Number(req.body.CId);
  const UpdateParentCategoryValue = req.body;

  if (!req.body.CId) {
    return res.status(400).send("CId is required");
  }

  try {
    const updateParentCategory = await ParentCategory.findOneAndUpdate(
      { CId: FindCId },
      UpdateParentCategoryValue,
      { new: true }
    );
    if (!UpdateParentCategoryValue) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(updateParentCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delele User Data
export const DeleteParentCategoryRouter = async (req, res) => {
  const FindCIds = JSON.parse(req.body.CId);

  if (!FindCIds || !Array.isArray(FindCIds)) {
    return res.status(400).send("CIds is required and should be an array");
  }

  try {
    const DeleteUser = await ParentCategory.deleteMany({
      CId: { $in: FindCIds },
    });

    if (DeleteUser.deletedCount === 0) {
      return res.status(404).send("No users found to delete");
    }

    res.send(`${DeleteUser.deletedCount} users deleted successfully`);
  } catch (error) {
    res.status(500).send("Error deleting users: " + error.message);
  }
};
