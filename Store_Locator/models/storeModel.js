//will create schema here
const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please add the Store ID"],
    unique: true,
    trim: true,
    maxlength: [10, "store ID must be less than 10 chars"]
  },
  address: {
    type: String,
    required: [true, "please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"] //this is goint to be geoJSON points
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//geocode and create location
storeSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  //do not save address to db
  this.address = undefined;
  next();
});
module.exports = mongoose.model("store", storeSchema); //this model is going to be called store and we are passing the storeSchema into store

/*
  we are going to create a middleware which will convert the address column into the location and coordinates.
  hence in that way , we dont need to add the latitude and longitude into the api as we will just send the address 
  and geocoder will change that address into the location and then we will make only the location column to be saved into the 
  db but not the address 
*/
