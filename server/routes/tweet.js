import express from "express";
const router = express.Router();

import { addTweet } from "../controllers/tweet.js";

/*
router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/:id", userController.findOne);
router.put("/:id", userController.UpdateUser);
router.delete("/:id", userController.delete);
*/


router.post("/addTweet",addTweet);
// router.post("/signup",signup);


export default router;