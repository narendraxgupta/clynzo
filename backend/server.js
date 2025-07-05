// import express from "express"
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from "./config/mongodb.js"
// import connectCloudinary from "./config/cloudinary.js"
// import userRouter from "./routes/userRoute.js"
// import doctorRouter from "./routes/doctorRoute.js"
// import adminRouter from "./routes/adminRoute.js"

// // app config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // middlewares
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use("/api/user", userRouter)
// app.use("/api/admin", adminRouter)
// app.use("/api/doctor", doctorRouter)

// app.get("/", (req, res) => {
//   res.send("API Working")
// });

// app.listen(port, () => console.log(`Server started on PORT:${port}`))


import express from "express";
import cors from "cors";
import 'dotenv/config';

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);

// Root
app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ FOR VERCEL:
export default app;
