const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    // Add retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });

        console.log("MongoDB Connected Successfully");
        console.log(`Host: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);

        // Handle connection events
        mongoose.connection.on("error", (err) => {
          console.error("MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
          console.log("MongoDB disconnected. Attempting to reconnect...");
        });

        mongoose.connection.on("reconnected", () => {
          console.log("MongoDB reconnected");
        });

        return conn;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        console.log(
          `Connection failed, retrying... (${retries} attempts left)`
        );
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      }
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    console.error("Error Details:", {
      message: error.message,
      code: error.code,
      name: error.name,
    });

    // Don't exit the process, but throw the error to be handled by the caller
    throw error;
  }
};

// Export both the connection function and the mongoose instance
module.exports = connectDB;
