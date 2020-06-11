
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://fabrizioborelli.com.br:27017/';
mongoose.connect(mongoDB);

//Get the default connection

//Bind connection to error event (to get notification of connection errors)


    mongoose.connection.on('connected', function () {  
    
    mongoose.connection.close();
    return true;
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    
    mongoose.connection.close();
    return false;
  }); 
  
  
  
