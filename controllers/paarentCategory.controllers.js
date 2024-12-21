import ParentCategory from "../model/parentCategory.model.js";
//Read Users Data
export const ReadeParentCategoryRouter = async (req, res) => {
  try {
    const { CId, Category, Status } = req.query;
    let query = {};
    if (CId) query.CId = Number(CId);
    if (Category) query.Category = { $regex: Category, $options: "i" };
    if (Status) query.Status = Status === "true";
    const GetUsers = await ParentCategory.find(query);
    res.json(GetUsers.sort((a, b) => a.DisplayOrder - b.DisplayOrder));
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
    Category: req.body.Category,
    Status: req.body.Status,
    DisplayOrder: req.body.DisplayOrder,
  });
  try {
    const parentCategory = await newParentCategory.save();
    // return res.status(200).json(parentCategory);
    return res
      .status(200)
      .json({ message: `Successfully Create the Parent Category:!!` });
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
      return res.status(404).json({ message: "Data not found" });
    }
    res
      .status(200)
      .json({ message: `Successfully Update the Parent Category:!!` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delele User Data
export const DeleteParentCategoryRouter = async (req, res) => {
  const FindCIds = JSON.parse(req.body.CId);

  if (!FindCIds) {
    return res
      .status(400)
      .json({ message: "Ids is required and should be an array" });
  }

  try {
    const DeleteUser = await ParentCategory.deleteMany({
      CId: { $in: FindCIds },
    });

    if (DeleteUser.deletedCount === 0) {
      return res.status(404).json("No users found to delete");
    }

    // res.send(`${DeleteUser.deletedCount} users deleted successfully`);
    res.status(200).json({
      message: `${DeleteUser.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users: " + error.message });
  }
};
