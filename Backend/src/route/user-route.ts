import { Router } from "express";
import { addUser, getAllUser, login, uploadProfilePicture } from "../controller/user-controller.js";

import upload from "../middleware/upload-middleware.js";
import { authenticate, authorizedRole } from "../middleware/auth-middleware.js";

const userRouter = Router();

userRouter.post("/register", addUser);

userRouter.post("/login", login);

userRouter.get("/get-all-user",authenticate,authorizedRole('manager', 'teamlead'),getAllUser );

userRouter.put(
  "/upload-profile/:id",
  authenticate,
  
  upload.single("profile_pic"),
  uploadProfilePicture
);

export default userRouter;