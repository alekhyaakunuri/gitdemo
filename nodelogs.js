var mongo=require('mongodb');
var express=require('express');

var pino=require('pino');
var exprpino=require('express-pino-logger');
var logger=pino({level : process.env.LOG_LEVEL || 'info'});
var exprlogger = exprpino({logger});
var expapp=express();
var myDB;
var req;
var res;
//process.env.LEVEL="VERBOSE";
//console.log('current logging level : ' + process.env.LEVEL);
expapp.use(exprlogger);

function testconnect(err, client)
{
    
if (err){
    //console.error(err.name);
    logger.debug(err.name);
   //console.error(err.stack);
   logger.debug(err.stack);
   //console.error("Unable to connect to database..");
   logger.debus("Unable to connect to database..");
}else{
    console.log("Connected to db.....");
    console.log("Client info : " +client);
    console.log(".................db connection tracing......")
    console.log("%O", client)
}

myDB=client.db('employee');
console.trace();
}
//retryWrites. works in a loop until the data modification is successful.
//w - Write. w=majority. It has to perform bulk writing/bulk modification
mongo.MongoClient.connect
('mongodb://localhost:27017/employee?retryWrites=true&w=majority', testconnect);

function getDocuments(request, response){
    console.log("%O" , request);
    console.log('querrying the database....');
    const mycursor=myDB.collection('empinfo').find();
    console.log('Sent the response to the browser....');
    console.trace();
    response.send("<html><body><b>Data</b></body></html>");

}

expapp.get('/', getDocuments);
expapp.listen(8082, function (err) { console.log("Started server @ port 8082");});
