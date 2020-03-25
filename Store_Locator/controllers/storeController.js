const storeModel = require("../models/storeModel");
exports.getStores = async (req, res, next) => {
  try {
    const stores = await storeModel.find();
    return res.status(200).send({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      //500 is server error
      error: "server Error"
    });
  }
};

//add stores
exports.addStore = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await storeModel.create(req.body);
    return res.status(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({
        error: "This store is already exist"
      });
    }
    return res.status(500).send({
      //500 is server error
      error: "server Error"
    });
  }
};
