var socketServerUrl = "";
var hostToLive = "http://localhost";

var socket = require("socket.io-client")(socketServerUrl);
const  {SSL_OP_NO_TICKET} = require('constants');
const { disconnect } = require("process");
const superagent = require('superagent');


socket.on("connect",function(){

})

socket.on("disconnect",function(){

})
socket.on("page-request",function(data){
    var path = data.pathname;
    var method = data.method;
    var params = data.params;

    var localhostUrl = hostToLive + path;
    if(method == "get")executeGet(localhostUrl,params);
    else if(method = "post")executePost(localhostUrl,params)


})


function executeGet(url,params){
    superagent.get(url).query(params).end((err,response)=>{
        if(err){console.log(err)}
        socket.emit('page-response',response.text)
    })
}

function executePost(url,params){
    superagent.post(url).query(params).end((err,response)=>{
        if(err){console.log(err)}
        socket.emit('page-response',response.text)
    })
}
