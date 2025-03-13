module.exports = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "adarsh",
    JWT_EXPIRES_IN: "1h",
    DB: {
        connection_string: process.env.DB_EXTERNAL_URL || 'postgresql://bank_p9hq_user:Jec7z1l553E1LwMplnDZ4Q9Q5ixyKxXL@dpg-cv8utul6l47c7383pvpg-a.oregon-postgres.render.com/bank_p9hq',
        host: process.env.DB_HOST || 'dpg-cv8utul6l47c7383pvpg-a',
        user: process.env.DB_USER || 'bank_p9hq_user',
        password: process.env.DB_PASSWORD || 'your-render-password',
        database: process.env.DB_NAME || 'bank_p9hq',
        port: process.env.DB_PORT || 5432,
        connectionLimit: 10
      }
};