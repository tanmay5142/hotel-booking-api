import { Router } from "express";
import { addHotel, search } from "../controllers/hotelController.js";
import { protect } from "../middleware/auth.js";
import { validateBody, validateQuery } from "../middleware/validate.js";
import { createHotelSchema, searchHotelSchema } from "../validation/hotelValidation.js";

const router = Router();

router.post("/", protect, validateBody(createHotelSchema), addHotel);
router.get("/search", validateQuery(searchHotelSchema), search);

export default router;