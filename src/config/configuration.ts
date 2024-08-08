export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
    accessExpiration:
      parseInt(process.env.JWT_ACCESS_EXPIRATION) || 1000 * 60 * 60,
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    refreshExpiration:
      parseInt(process.env.JWT_REFRESH_EXPIRATION) || 1000 * 60 * 60 * 24 * 30,
  },
});
