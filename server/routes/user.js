import express from "express";
const router = express.Router();

import { signin, signup, updateFollowerList, getUser } from "../controllers/user.js";

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


export default router;