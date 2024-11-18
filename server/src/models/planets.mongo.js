var mongoose = require('mongoose');

const planetsSchema=new mongoose.Schema({
    keplerName:{
        type:String,
        required:true
    }
});

// Connects planetSchema With planets Collection
module.exports= mongoose.model('Planet',planetsSchema);