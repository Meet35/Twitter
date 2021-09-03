import express from "express";
const router = express.Router();

import { signin, signup, updateFollowerList, getUser, getUsers } from "../controllers/user.js";
// import auth  from "../middleware/auth.js";

/*
router.get("/", userController.findAll);
router.post("/", userController.create);
router.get("/:id", userController.findOne);
router.put("/:id", userController.UpdateUser);
router.delete("/:id", userController.delete);
*/


router.post("/signin",signin);
router.post("/signup",signup);
router.post("/updateFollowerList",updateFollowerList);
router.get("/getuser/:userid",getUser);
router.get("/getusers",getUsers);

// router.get("/getFollowingList",getFollowingList);

export default router;