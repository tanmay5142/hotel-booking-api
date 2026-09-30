import { Request, Response } from "express";
import { createHotel, searchHotels } from "../services/hotelService.js";

export async function addHotel(req: Request, res: Response) {
  try {
    const hotel = await createHotel(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function search(req: Request, res: Response) {
  try {
    const { location, checkIn, checkOut, minPrice, maxPrice } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "checkIn and checkOut are required" });
    }
    
    const results = await searchHotels({
      location: location as string,
      checkIn: checkIn as string,
      checkOut: checkOut as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });

    res.json(results);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}  