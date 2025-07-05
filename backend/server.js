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


// file: api/index.js
import express from "express";
import cors from "cors";
import connectDB from "../backend/config/mongodb.js";
import connectCloudinary from "../backend/config/cloudinary.js";
import userRouter from "../backend/routes/userRoute.js";
import doctorRouter from "../backend/routes/doctorRoute.js";
import adminRouter from "../backend/routes/adminRoute.js";

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();
connectCloudinary();

// Routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);

// Base route
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// Export app as handler
export default app;
