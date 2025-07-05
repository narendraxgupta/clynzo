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


import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

const app = express()
const port = process.env.PORT || 4000

// ✅ Wrap all startup logic in an async function
const startServer = async () => {
  try {
    await connectDB()
    await connectCloudinary()

    app.use(express.json())
    app.use(cors())

    app.use("/api/user", userRouter)
    app.use("/api/admin", adminRouter)
    app.use("/api/doctor", doctorRouter)

    app.get("/", (req, res) => {
      res.send("API Working")
    })

    app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`))
  } catch (error) {
    console.error("❌ Server failed to start:", error.message)
    process.exit(1) // Stop server if init fails
  }
}

startServer()
