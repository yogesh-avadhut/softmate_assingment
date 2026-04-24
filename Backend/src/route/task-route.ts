import { Router } from "express";
import { addTask, deleteTsk, getAllTask, updatetask, updateTStatus } from "../controller/task-controller.js";
import { authenticate, authorizedRole } from "../middleware/auth-middleware.js";

const taskRouter = Router()

taskRouter.post( "/add-task",authenticate,authorizedRole('manager','teamlead'), addTask)


taskRouter.get("/get-all-task",authenticate,authorizedRole('manager','teamlead'),getAllTask )

taskRouter.patch("/update-task",authenticate,authorizedRole('manager','teamlead'),updatetask)

taskRouter.patch(
  "/update-task-status",
  authenticate,
  authorizedRole('manager','employee','teamlead'),
  updateTStatus
)

taskRouter.delete("/delete/:id",authenticate,authorizedRole('manager','teamlead'),deleteTsk )

export default taskRouter;