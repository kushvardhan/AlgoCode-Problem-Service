const dotenv=require('dotenv');
dotenv.config();

module.exports={
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    LOGGER_MONGO_URI: process.env.MONGO_URI_LOGGER,
    NODE_ENV : process.env.NODE_ENV || "development"
}