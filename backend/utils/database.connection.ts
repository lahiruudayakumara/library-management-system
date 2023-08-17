import mongoose, { Connection } from "mongoose";

import config  from "../configs";
import logger from "./logger";

let database: Connection | undefined;

const connect = async (): Promise<void> => {
    const MONGODB_URL: string = config.DB_CONNECTION_STRING || "";

    if (database) return;

    try {
        const connection = await mongoose.connect(MONGODB_URL);
        database = connection.connection; // Assign the connection object
        logger.info("Database Synced");
    } catch (err) {
        logger.error((err as Error).message);
    }
};

export { connect };