import { z } from "zod";

export const createBookingSchema = z.object({
  hotelId: z.string().min(1, "Hotel id is required"),
  roomType: z.string().min(1, "Room type is required"),
  checkIn: z.string().refine((val) => !isNaN(Date.parse(val)), "CheckIn must be a valid date"),
  checkOut: z.string().refine((val) => !isNaN(Date.parse(val)), "CheckOut must be a valid date"),
});  