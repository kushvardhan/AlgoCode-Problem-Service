const mongoose = require('mongoose');

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