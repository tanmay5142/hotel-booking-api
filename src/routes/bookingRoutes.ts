import { Router } from "express";
import { book, getBookings, cancel } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { createBookingSchema } from "../validation/bookingValidation.js";

const router = Router();

router.post("/", protect, validateBody(createBookingSchema), book);
router.get("/", protect, getBookings);
router.patch("/:id/cancel", protect, cancel);

export default router;