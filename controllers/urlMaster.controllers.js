import UrlMaster from "../model/urlMaster.model.js";

//Reade UrlMaster Data
export const ReadeUrlMasterRouter = async (req, res) => {
  const restructureArray = (data) => {
    const result = [];

    const addWithChild = (item) => {
      result.push(item);
      data
        .filter((child) => child.Childof === item.Id)
        .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
        .forEach(addWithChild);
    };

    data
      .filter((item) => item.Childof === 0)
      .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
      .forEach(addWithChild);
    return result;
  };

  try {
    const { Id, MasterName, Status, MainMasterName } = req.query;
    let query = {};
    if (Id) query.Id = Number(Id);
    if (MasterName) query.MasterName = { $regex: MasterName, $options: "i" };
    if (MainMasterName)
      query.MainMasterName = { $regex: MainMasterName, $options: "i" };
    if (Status) query.Status = Status === "true";
    const GetUrlMaster = await UrlMaster.find(query);
    res.json(restructureArray(GetUrlMaster));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create UrlMaste data
export const CreateUrlMasterRouter = async (req, res) => {
  const GetUrlMaster = await UrlMaster.find();
  const GetUrlChildMaster = await UrlMaster.find({
    Id: Number(req.body.Childof) != 0 ? Number(req.body.Childof) : [],
  });
  const sort = (await GetUrlMaster.sort((a, b) => b.Id - a.Id)) || [];
  const newUrlMaster = new UrlMaster({
    Id: Number(sort.length > 0 ? sort[0]?.Id + 1 : 1),
    MasterName: req.body.MasterName,
    Childof:
      Number(req.body.Childof) != 0 ? Number(GetUrlChildMaster[0]?.Id) : 0,
    MainMasterName:
      Number(req.body.Childof) != 0 ? GetUrlChildMaster[0]?.MasterName : "",
    Icon: req.body.Icon,
    Url: req.body.Url,
    Status: req.body.Status,
    DisplayOrder: req.body.DisplayOrder,
  });
  try {
    const urlMaster = await newUrlMaster.save();
    return res
      .status(200)
      .json({ message: `Successfully Create the Url Master:!!` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Update Url Master
export const UpdateUrlMasterRouter = async (req, res) => {
  const FindId = Number(req.body.Id);
  const UpdateUrlMasterValue = req.body;
  const GetChildUrlMaster = await UrlMaster.find({
    Id: Number(req.body.Childof) != 0 ? Number(req.body.Childof) : [],
  });
  if (!req.body.Id) {
    return res.status(400).send("Id is required");
  }
  try {
    const updateUrlMaster = await UrlMaster.findOneAndUpdate(
      { Id: FindId },
      {
        MasterName: req.body.MasterName,
        Childof:
          Number(req.body.Childof) != 0 ? Number(GetChildUrlMaster[0]?.Id) : 0,
        MainMasterName:
          Number(req.body.Childof) != 0 ? GetChildUrlMaster[0]?.MasterName : 0,
        Icon: req.body.Icon,
        Url: req.body.Url,
        Status: req.body.Status,
        DisplayOrder: req.body.DisplayOrder,
      },
      { new: true }
    );
    if (!UpdateUrlMasterValue) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: `Successfully Update the Url Master:!!` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete Url Master
export const DeleteUrlMasterRouter = async (req, res) => {
  const FindId = JSON.parse(req.body.Id);
  if (!FindId) {
    return res
      .status(400)
      .json({ message: "Ids is required and should be an array" });
  }
  try {
    const DeleteUrlMaster = await UrlMaster.deleteMany({
      Id: { $in: FindId },
    });
    if (DeleteUrlMaster.deletedCount === 0) {
      return res.status(404).json("Data users found to delete");
    }
    res.status(200).json({
      message: `${DeleteUrlMaster.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users: " + error.message });
  }
};
