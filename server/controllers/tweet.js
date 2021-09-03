

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
    const userid1 = req.params.userid;
    const user = await User.findOne({userid:userid1});
  // console.log(req.body);
      try {
        Tweet.find(
          {
            $or: [
              { "userid": { $in: user.following } },
              // { "postedBy.name": req.user.name },
            ],
          },
          null,
          { limit: 10, sort: { date: -1 } },
          (err, tweets) => {
            if (err) {
              console.log(err);
              res.status(401).send(err);
            } else res.json(tweets);
          }
        );
        // console.log(req.userid);
        // const user=User.findOne({email:req.body.email});
        // const tweet = await Tweet.find().sort({email:1});
        // userid
        // following
        // Tweet.find(userid in following).sort({email:1});
    //     console.log(tweet);
        // res.status(200).json(tweet);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
      }
    };

