import { Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
import { createBooking, getUserBookings, cancelBooking } from "../services/bookingService.js";

export async function book(req: AuthRequest, res: Response) {
  try {
    const { hotelId, roomType, checkIn, checkOut } = req.body;
    const booking = await createBooking(req.userId as string, hotelId, roomType, checkIn, checkOut);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function getBookings(req: AuthRequest, res: Response) {
  const bookings = await getUserBookings(req.userId as string);
  res.json(bookings);
}

export async function cancel(req: AuthRequest, res: Response) {
  try {
    const booking = await cancelBooking(req.userId as string, req.params.id as string);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}    