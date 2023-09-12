import { connect } from "./utils/database.connection";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "./utils/logger";
import routes  from "./routes";

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "20mb" }));

app.use("/api", routes);

app.listen(PORT, () => {
  logger.info(`Server is up and running on PORT ${PORT}`);
  connect();
});
