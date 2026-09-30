import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(compression());
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});


export default app;