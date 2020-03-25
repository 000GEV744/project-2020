const express = require("express");
const { getStores, addStore } = require("../controllers/storeController");
const router = express.Router();

router
  .route("/")
  .get(getStores)
  .post(addStore);
module.exports.storeRoutes = router;
