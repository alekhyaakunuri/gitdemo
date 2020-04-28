var server =require('http');
var visitorcount=0;
function processRequest(request,response){
    console.log("**********");
    response.writeHead(200,{'Content-Type':'text/html'});
    var today=new Date();
    var str='<HTML><BODY><B>FIRST NODE JS<BR>';
    visitorcount++;
    str+='<B>Visitor#<B>'+visitorcount++;
    str+='<B>Today:'+today+'<BR>';
    str+='<B>Today:'+today+'<BR>';
    str+='<B><I>WELCOME TO NODE JS</I><BR><BODY></HTML>';
    response.end(str);




}
var s=server.createServer(processRequest);
var l=s.listen(8080);
console.log("started server waiting for client request");