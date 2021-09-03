import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, userid } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    if (password != confirmPassword) return res.status(400).json({ message: "Incorrect Password" });

    const repassword = password;

    const hashedPassword = await bcrypt.hash(password, 12);

    const isPasswordCorrect = await bcrypt.compare(repassword, hashedPassword);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` ,userid });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const updateFollowerList = async (req, res) => {

  const symbol = req.body;
  // console.log(symbol);
  //console.log(symbol.symbol);
  try {
    // console.log(req.userId);
    // const list=await User.
      const FollowingList = await User.findOne({ userid: symbol.personId });
      const WhomToFollow = await User.findOne({userid:symbol.userId});
      // const index = FollowingList.symbols.findIndex((sym) => sym === String(symbol.symbol));
    console.log(FollowingList);
      if(FollowingList.following.includes(symbol.userId))
      {
        FollowingList.following.remove(symbol.userId);
        WhomToFollow.followers.remove(symbol.personId);
      }
      else
      {
        FollowingList.following.push(symbol.userId);
        WhomToFollow.followers.push(symbol.personId);
     }
      

      const updatedFollowingList = await User.findByIdAndUpdate(FollowingList._id, FollowingList, { new: true });
      const updatedWhomToFollow = await User.findByIdAndUpdate(WhomToFollow._id, WhomToFollow, { new: true });
      //console.log(updateWatchlist);
      console.log(updateFollowerList);
      res.status(200).json(updatedFollowingList);
  } catch (error) {
      console.log(error);
  }
}

// export const getFollowingList = async (req, res) => {

//   // const symbol = req.body;
//   // console.log(symbol);
//   //console.log(symbol.symbol);
//   try {
//     // console.log(req.userId);
//       const FollowingList = await User.findOne({ userid: req.userId });
//       // const WhomToFollow = await User.findOne({userid:symbol.personId});
//       // const index = FollowingList.symbols.findIndex((sym) => sym === String(symbol.symbol));
//     // console.log(FollowingList);

//       // FollowingList.following.push(symbol.personId);
//       // WhomToFollow.followers.push(symbol.userId);

//       // const updatedFollowingList = await User.findByIdAndUpdate(FollowingList._id, FollowingList, { new: true });
//       // const updatedWhomToFollow = await User.findByIdAndUpdate(WhomToFollow._id, WhomToFollow, { new: true });
//       //console.log(updateWatchlist);
//       // console.log(updateFollowerList);
//       res.status(200).json(FollowingList.following);
//   } catch (error) {
//       console.log(error);
//   }
// }

// export const deleteFollower = async (req, res) => {

//   const symbol = req.body;
//   // console.log(symbol);
//   //console.log(symbol.symbol);
//   try {
//     // console.log(req.userId);
//       const FollowingList = await User.findOne({ userid: symbol.userId });
//       const WhomToFollow = await User.findOne({userid:symbol.personId});
//       // const index = FollowingList.symbols.findIndex((sym) => sym === String(symbol.symbol));
//     console.log(FollowingList);

//       FollowingList.following.push(symbol.personId);
//       WhomToFollow.followers.push(symbol.userId);

//       const updatedFollowingList = await User.findByIdAndUpdate(FollowingList._id, FollowingList, { new: true });
//       const updatedWhomToFollow = await User.findByIdAndUpdate(WhomToFollow._id, WhomToFollow, { new: true });
//       //console.log(updateWatchlist);
//       console.log(updateFollowerList);
//       res.status(200).json(updatedFollowingList);
//   } catch (error) {
//       console.log(error);
//   }
// }

export const getUser = async (req, res) => {

  try {
      const user = await User.findOne({ userid: req.params.userid });
      // var data = [];
      //console.log(watchlist);
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message, why: "why you do this to me?" });
  }
}

export const getUsers = async (req, res) => {

  try {
      const user = await User.find({}).sort({userid:1});
      // var data = [];
      //console.log(watchlist);
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message, why: "why you do this to me?" });
  }
}