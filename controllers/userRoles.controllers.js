import UserRoles from "../model/userRoles.model.js";

//Reade UserRoles data
export const ReadeUserRoleRouter = async (req, res) => {
  try {
    const { Id, RoleName, Status } = req.query;
    let query = {};
    if (Id) query.Id = Number(Id);
    if (RoleName) query.RoleName = { $regex: RoleName, $options: "i" };
    if (Status) query.Status = Status === "true";
    const GetUserRoles = await UserRoles.find(query);
    res.json(GetUserRoles.sort((a, b) => a.DisplayOrder - b.DisplayOrder));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create UserRoles data
export const CreateUserRolesRouter = async (req, res) => {
  const now = new Date();
  const GetUserRoles = await UserRoles.find();
  const sort = (await GetUserRoles.sort((a, b) => b.Id - a.Id)) || [];

  const newUserRoles = new UserRoles({
    Id: Number(sort.length > 0 ? sort[0]?.Id + 1 : 1),
    RoleName: req.body.RoleName,
    Status: req.body.Status,
    DisplayOrder: req.body.DisplayOrder,
    Createdat: now.toLocaleString("en-GB"),
  });
  try {
    const userRoles = await newUserRoles.save();
    return res
      .status(200)
      .json({ message: `Successfully Create the User Role:!!` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Update UserRoles data
export const UpdateUserRolesRouter = async (req, res) => {
  const FindId = Number(req.body.Id);
  const UpdateUserRoles = req.body;
  if (!req.body.Id) {
    return res.status(400).send("Id is required");
  }
  try {
    const updateUserRoles = await UserRoles.findOneAndUpdate(
      { Id: FindId },
      {
        RoleName: req.body.RoleName,
        Status: req.body.Status,
        DisplayOrder: req.body.DisplayOrder,
      },
      { new: true }
    );
    if (!UpdateUserRoles) {
      return res.status(404).json({ message: "User Roles not found" });
    }
    res.status(200).json({ message: `Successfully Update the User Roles:!!` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete UserRoles data
export const DeleteUserRolesRouter = async (req, res) => {
  const FindId = JSON.parse(req.body.Id);
  if (!FindId) {
    return res
      .status(400)
      .json({ message: "Ids is required and should be an array" });
  }
  try {
    const DeleteUserRoles = await UserRoles.deleteMany({
      Id: { $in: FindId },
    });
    if (DeleteUserRoles.deletedCount === 0) {
      return res.status(404).json("No User Role found to delete");
    }
    res.status(200).json({
      message: `${DeleteUserRoles.deletedCount} User Roles deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users: " + error.message });
  }
};
