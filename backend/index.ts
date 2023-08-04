import "dotenv/config";

import { connect } from "./utils/database.connection";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "./utils/logger";
import routes  from "./routes";

// const reservationRouter = require('./routes/reservationRouter');
// const penaltyRouter = require('./routes/penaltyRoutes');
// const transactionRouter = require('./routes/transactionRoutes');
// const paymentRouter = require('./routes/paymentRoute');

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "20mb" }));

app.use("/api", routes);
// app.use('/api/reservations', reservationRouter);
// app.use('/api/penalty', penaltyRouter);
// app.use('/api/transaction', transactionRouter);
// app.use('./api/payment', paymentRouter);

// app.use("/api/test", testRoutes);

app.listen(PORT, () => {
  logger.info(`Server is up and running on PORT ${PORT}`);
  connect();
});
