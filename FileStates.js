var fsmodule=require('fs');
fsmodule.stat(process.argv[2], function(err, stats){
    if(err){
        console.error("Unable to fetch meata info");
    }else
    {
        console.log("File Info...");
        console.log(stats); //err and stats objects are automatically created
    }
}
)