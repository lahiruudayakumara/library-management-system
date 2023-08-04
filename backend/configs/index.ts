const config = {
    DB_CONNECTION_STRING: process.env.MONGODB_URL,
    STRIPE_SECRET_KEY_STRING: process.env.STRIPE_SECRET_KEY,
    // CLIENT_URL: process.env.CLIENT_URL
}

export default config;