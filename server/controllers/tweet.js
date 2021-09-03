

import Tweet from "../models/tweet.js";
import User from "../models/user.js";


export const addTweet = async (req, res) => {
//   const email = req.body.email;
//   const message = req.body.message;
  try {
    
    // const user=User.findOne({email:req.body.email});
    const tweet = Tweet.create({email:req.body.email, message:req.body.message, userid:req.body.userid});
    console.log(tweet);
    res.status(200).json(tweet);
} catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTweet = async (req, res) => {
    //   const email = req.body.email;
    //   const message = req.body.message;
      try {
        
        // const user=User.findOne({email:req.body.email});
        const tweet = await Tweet.find().sort({email:1});
        console.log(tweet);
        res.status(200).json(tweet);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
      }
    };

