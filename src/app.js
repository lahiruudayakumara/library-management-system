import express from "express"
import cors from "cors"
import "dotenv/config"
import logger from "./utils/logger";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb"}));

app.get("/", (req, res, next) => {
    res.send("<h2>📚 Library Managment System API</h2>")
})

app.listen(PORT, () => {
    logger.info(`🚀 Server is up and running on PORT ${PORT}`)
})