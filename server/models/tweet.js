import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      // unique: true,
    //   required: true,
    },
    message :{
        type:String,
        // required: true,
    },
    userid :{
      type : String
    },
    date: {
      type: Date,
      default: Date.now,
    },
});

export default mongoose.model("Tweet", schema);