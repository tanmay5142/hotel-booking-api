import { z } from "zod";

export const createHotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  rooms: z
    .array(
      z.object({
        name: z.string().min(1),
        pricePerNight: z.number().positive("Price must be positive"),
        totalRooms: z.number().int().positive("Total rooms must be a positive integer"),
      })
    )
    .min(1, "At least one room type is required"),
});

export const searchHotelSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid check-in date"),
  checkOut: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid check-out date"),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});