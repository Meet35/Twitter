import express from "express";
// import auth from "auth.js";
const router = express.Router();

import { addTweet, getTweet } from "../controllers/tweet.js";
// import auth  from "../middleware/auth.js";

/*
router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/:id", userController.findOne);
router.put("/:id", userController.UpdateUser);
router.delete("/:id", userController.delete);
*/


router.post("/addTweet",addTweet);
router.get("/getTweet/:userid",getTweet);
// router.post("/signup",signup);


export default router;