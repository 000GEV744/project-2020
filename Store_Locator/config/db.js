const mongoose = require("mongoose");

const connectDB = async () => {
  //because mongoose returns promises
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host} `);
  } catch (error) {
    console.log(error);
    process.exit(1); //if there is any error then will exit out of the app and passing 1 to show exit because of failure
  }
};
module.exports = connectDB;
