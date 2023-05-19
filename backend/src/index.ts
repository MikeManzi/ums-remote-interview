import express from "express"
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerConfig from "../swagger.json"
import cors from "cors"
import path from "path"
import { connectDB } from "./db/config"
import userRouter from "./routes/user.route"

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerConfig))
)

const publicFolderPath = path.join(__dirname, '../public');
const uploadFolderPath = path.join(__dirname, '../uploads')
app.use('/', express.static(publicFolderPath));
app.use('/uploads', express.static(uploadFolderPath))

app.use("/api/users/", userRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})