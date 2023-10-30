import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const db = mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongoose connection : ${process.env.MONGO_URI}`);
  } catch (err) {
    console.log(`MongoDB error: ${err.message}`);
  }
};

export default connectDatabase;
