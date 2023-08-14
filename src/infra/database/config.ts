import mongoose from "mongoose";

const URL = process.env.REACT_APP_MONGO_URL as string

export const db=()=>{
mongoose.connect(URL)
  .then(() => {
    console.log("Database connected successfully",URL);
  })
  .catch((error) => {
    console.log(error.message);
  });
}