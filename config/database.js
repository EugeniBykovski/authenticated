const mongoose = require("mongoose");
const colors = require("colors");

exports.connect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://bykovskieug:17.17.17.17@cluster-authenticated.iptpxid.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB connection: ${connect.connection.host}`.cyan.bold);
  } catch (error) {
    console.log("Database connection failed! Exiting now...");
    console.error(error);
    process.exit(1);
  }
};
