import UserRoles from "../model/userRoles.model.js";
import RolePermmission from "../model/rolePermission.model.js";
import UrlMaster from "../model/urlMaster.model.js";

//Read Role Permission data
export const ReadeRolePermissionRouter = async (req, res) => {
  try {
    const { Id, RoleId } = req.query;
    let query = {};
    if (Id) query.Id = Number(Id);
    if (RoleId) query.RoleId = Number(RoleId);
    const GetRolePermission = await RolePermmission.find(query);
    res.json(GetRolePermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Role Permission data
export const CreateRolesPermissionRouter = async (req, res) => {
  const GetRolePermission = await RolePermmission.find();
  const GetUserRoles = await UserRoles.find({ Id: Number(req.body.RoleId) });
  const GetUrlMaster = await UrlMaster.find({ Id: Number(req.body.MasterId) });
  const sort = (await GetRolePermission.sort((a, b) => b.Id - a.Id)) || [];
  const newRolePermission = new RolePermmission({
    Id: Number(sort.length > 0 ? sort[0]?.Id + 1 : 1),
    RoleName: GetUserRoles[0]?.RoleName,
    RoleId: req.body.RoleId,
    MasterId: req.body.MasterId,
    MasterName: GetUrlMaster[0]?.MasterName,
    Read: req.body.Read,
    Write: req.body.Write,
    Delete: req.body.Delete,
  });
  try {
    const rolePermission = await newRolePermission.save();
    return res
      .status(200)
      .json({ message: `Successfully Create the Permission:!!` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Update RolePermission
export const UpdateRolePermissionRouter = async (req, res) => {
  const FindId = Number(req.body.Id);
  const UpdateRolePermission = req.body;
  if (!req.body.Id) {
    return res.status(400).send("Id is required");
  }
  try {
    const updateRoleMaster = await RolePermmission.findOneAndUpdate(
      { Id: FindId },
      {
        RoleId: req.body.RoleId,
        Read: req.body.Read,
        Write: req.body.Write,
        Delete: req.body.Delete,
      },
      { new: true }
    );
    if (!UpdateRolePermission) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: `Successfully Update the Permission:!!` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete Role Permission
export const DeleteRolePermission = async (req, res) => {
  const FindId = JSON.parse(req.body.Id);
  if (!FindId) {
    return res
      .status(400)
      .json({ message: "Ids is required and should be an array" });
  }
  try {
    const DeleteRolePermmission = await RolePermmission.deleteMany({
      Id: { $in: FindId },
    });
    if (DeleteRolePermmission.deletedCount === 0) {
      return res.status(404).json("Data Permission found to delete");
    }
    res.status(200).json({
      message: `${DeleteRolePermmission.deletedCount} Permission deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users: " + error.message });
  }
};
