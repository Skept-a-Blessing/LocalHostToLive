var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var url = require('url');
var bodyparser = require('body-parser');

app.use(bodyparser());
var clientObjectRef;
app.get('/*',(req,res)=>{
    var pathname = url.parse(req.url).pathname;

    var obj = {
        pathname:pathname,
        method:"get",
        params:req.query
    };
    io.emit("page-request",obj);
    clientObjectRef = res;
});

app.post('/*',(req,res)=>{
    var pathname = url.parse(req.url).pathname;

    var obj = {
        pathname:pathname,
        method:"post",
        params:req.query
    };
    io.emit("page-request",obj);
    clientObjectRef = res;
});

io.on('connection',(socket)=>{
    socket.on("page-response",(response)=>{
        clientObjectRef.send(response);
    })
})
var server_port = 3000;
http.listen(server_port,()=>{

})
