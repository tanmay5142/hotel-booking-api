import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";
import redis from "../config/redis.js";

export async function createHotel(data: {
  name: string;
  location: string;
  description?: string;
  amenities?: string[];
  rooms: { name: string; pricePerNight: number; totalRooms: number }[];
}) {
  return Hotel.create(data);
}

export async function searchHotels(params: {
  location?: string;
  checkIn: string;
  checkOut: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const cacheKey = `search:${JSON.stringify(params)}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("Cache HIT:", cacheKey);
    return JSON.parse(cached);
  }
  console.log("Cache MISS:", cacheKey);

  const { location, checkIn, checkOut, minPrice, maxPrice } = params;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const query: Record<string, unknown> = {};
  if (location) query.location = { $regex: location, $options: "i" };

  const hotels = await Hotel.find(query).lean();
  const results = [];

  for (const hotel of hotels) {
    const availableRooms = [];

    for (const room of hotel.rooms) {
      if (minPrice && room.pricePerNight < minPrice) continue;
      if (maxPrice && room.pricePerNight > maxPrice) continue;

      // this room only if it starts before our checkout AND ends after our checking
      const overlappingCount = await Booking.countDocuments({
        hotel: hotel._id,
        roomType: room.name,
        status: { $ne: "cancelled" },
        checkIn: { $lt: checkOutDate },
        checkOut: { $gt: checkInDate },
      });

      if (overlappingCount < room.totalRooms) {
        availableRooms.push({ ...room, roomsLeft: room.totalRooms - overlappingCount });
      }
    }    
      if (availableRooms.length > 0) {
        results.push({ ...hotel, rooms: availableRooms });
      }
  }
  
  await redis.set(cacheKey, JSON.stringify(results), "EX", 30);

  return results;
}  
