import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userid :{
      unique: true,
      type : String
    },
    followers :{
      type: [String],
      default: []
    },
    following :{
      type: [String],
      default: []
    },
});

export default mongoose.model("User", schema);