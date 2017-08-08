var http = require("http");
var url = require("url");

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200);

    switch (page){
        case "/" :
            res.write("Bienvenue sur nodeinit");
            break;
        case "/login" :
            res.write("login page");
            break;
        default :
            res.writeHead(404);
    }
    res.end();
});
server.listen(8080);