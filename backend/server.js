import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-ecommerce-pooja.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);

// http://localhost:8000/api/v1/user/register

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port : ${PORT}`);
});
