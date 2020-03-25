var NodeGeocoder = require("node-geocoder");

var options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: <USER_API_KEY>,
  formatter: null
};

var geocoder = NodeGeocoder(options);

module.exports = geocoder;
