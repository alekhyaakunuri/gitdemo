var mysql = require ('mysql');
var express=require('express');
var expapp=express();
const mysqlconn=mysql.createConnection({host:'localhost',user:'root',password:'Alli@23#',database:'first'});
var emplist=[{"emp_id":100,"emp_name":"Anjali Potula","salary":23000,"landline":3456677,"mobileno":567894834},
{"emp_id":101,"emp_name":"Anusha Mahankali","salary":23000,"landline":3456567,"mobileno":567984834},
{"emp_id":102,"emp_name":"Alekya Akunuri","salary":23000,"landline":3456576,"mobileno":567984843},
{"emp_id":103,"emp_name":"Sai Manasa","salary":23000,"landline":3546576,"mobileno":657984843},
{"emp_id":106,"emp_name":"Swaroop","salary":23000,"landline":3546586,"mobileno":657084843},
{"emp_id":107,"emp_name":"Nidima","salary":23000,"landline":3566586,"mobileno":657086843},
{"emp_id":108,"emp_name":"YACOB","salary":23000,"landline":4566586,"mobileno":957086843},
{"emp_id":110,"emp_name":"Vamsi","salary":23000,"landline":4566576,"mobileno":953086843}];
function testconn(err){
    if(err)
    console.log('Unable to connect to database');
    else
    console.log('connected successfully');
}
var req;
var res;
mysqlconn.connect(testconn);
function printEmployees(err,rows){
    res.send(rows);
}

function getAllEmployees(request,response){
         req=request;
         res=response;
         mysqlconn.query('select *from employee',printEmployees);
       
}
function getAllEmployee(request,response){
    req=request;
    res=response;
    mysqlconn.query('select salary,landline from employee where emp_name="Swaroop"',printEmployees);
    for(i=0;i<emplist.length;i++){
    var emp=emplist[i];
    var str =
    "<html> <body> <table border=2> <head><tr><th><b>Salary</b></th><th><b>Landline</b></th></tr></head>";
  str += "<body><tr><td>" + emp.salary + "</td><td>" + emp.landline + "</td></tr>";
  str +='</body></html>';

    }
  response.send(str);
  
}
function getEmployee(request,response){
    req=request;
    res=response;
    mysqlconn.query('select emp_name,salary,landline,mobileno from  employee where emp_id=108',printEmployees);
}
function getUpdate(request,response){
    req=request;
    res=response;
    mysqlconn.query('update employee set salary=replace(salary,"23000","45000") ',printEmployees);
    for(i=0;i<emplist.length;i++){
        var emp=emplist[i];
        var str =
        "<html> <body> <table border=2> <head><tr><th><b>salary</b></th></tr></head>";
      str += "<body><tr><td>" + emp.salary + "</td></tr>";
      str +='</body></html>';
    
        }
      response.send(str);
}
function getDelete(request,response){
    req=request;
    res=response;
    mysqlconn.query('delete employee where emp_id=100',printEmployees);
    console.log("deeleted 100");
}


expapp.get('/',getAllEmployees);
expapp.get('/getUpdate',getUpdate);
expapp.get('/getDelete',getDelete);
expapp.get('/getAllEmployee/:_name',getAllEmployee);
expapp.get('/getEmployee/:_id', getEmployee);
expapp.listen(8081);
console.log('server started at port 8081');
