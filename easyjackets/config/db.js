import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL_LIVE);
    console.log(
      `Connected To Mongodb Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (err) {
    console.log(`Error in Mongodb ${err}`.bgRed.white);
  }
};

export default connectDB;
