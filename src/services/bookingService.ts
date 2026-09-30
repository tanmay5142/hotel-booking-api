import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";

export async function createBooking(
  userId: string,
  hotelId: string,
  roomType: string,
  checkIn: string,
  checkOut: string,
) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkInDate >= checkOutDate) throw new Error("checkout must be after checkin");

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) throw new Error("Hotel not found");

  const room = hotel.rooms.find((r) => r.name === roomType);
  if (!room) throw new Error("Room not found");

  const overlappingCount = await Booking.countDocuments({
    hotel: hotelId,
    roomType,
    status: { $ne: "cancelled" },
    checkIn: { $lt: checkOutDate },
    checkOut: { $gt: checkInDate },
  });

  if (overlappingCount >= room.totalRooms) {
    throw new Error("No more rooms available for these dates");
  }

  const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
  const totalPrice = nights * room.pricePerNight;

  return Booking.create({
    user: userId,
    hotel: hotelId,
    roomType,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    status: "confirmed",
    totalPrice,
  });
}

export async function getUserBookings(userId: string) {
  return Booking.find({ user: userId }).populate("hotel", "name location").sort({ createdAt: -1 });
}

export async function cancelBooking(userId: string, bookingId: string) {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) throw new Error("Booking not found");

  booking.status = "cancelled";
  await booking.save();

  return booking;
}