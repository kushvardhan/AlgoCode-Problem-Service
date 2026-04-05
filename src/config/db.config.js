const mongoose = require('mongoose');
const { NODE_ENV, MONGO_URI } = require('./server.config');

async function connectDB(){
    try{
        if(NODE_ENV === 'development'){  
            await mongoose.connect(MONGO_URI);
        }
    }catch(err){
        console.log("ERROR CONNECTING WITH DB.");
        console.log(err);
    }
}

module.exports = connectDB;