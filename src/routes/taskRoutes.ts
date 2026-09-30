import { Router } from "express";
import { create, list, getOne, update, remove } from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { createTaskSchema, updateTaskSchema } from "../validation/taskValidation.js";

const router = Router();

router.use(protect); //every task route needs a logged in user

router.post("/", validateBody(createTaskSchema), create);
router.get("/", list);
router.get("/:id", getOne);
router.patch("/:id", validateBody(updateTaskSchema), update);
router.delete("/:id", remove);

export default router;