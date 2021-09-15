const http = require("http");
const fs = require("fs")
const port = 3000;

const server = http.createServer(function (request, response) {

    if (request.url === "/") {
        fs.readFile("text.txt", function (err, data){
            if (err) {
                response.writeHead(400);
                response.end("something went wrong");
                response.end();
            } else {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data);
                return response.end();
            }
        })
   
    } if (request.url === "/create-file" && request.method === "POST") {

            let body = "";

            request.on("data", function (data) {
                body += data.toString();
            });

            request.on("end", function () {
                let parsedBody = JSON.parse(body);

                fs.writeFile(parsedBody.filename, parsedBody.message, function (err) {
                
                    if (err) {
                        response.writeHead(400);
                        response.end("something went wrong");
                        response.end();
                
                    } else {
                        response.end("File Created");
                        response.end();
                    }
                });
            });

    } if (request.url === "/update-file" && request.method === "PUT") {

        // fs.appendFile("text.txt", "testing updating file", function (err) {
                
        //     if (err) {
        //         response.writeHead(400);
        //         response.end("something went wrong");
        //         response.end();
            
        //     } else {
        //             response.end("File Updated");
        //             response.end();
        //     }
        // });
        let body = "";

        request.on("data", function (data) {
            body += data.toString();
        });

        request.on("end", function () {
            let parsedBody = JSON.parse(body);

            fs.appendFile(parsedBody.filename, `\n${parsedBody.message}`, function (err) {
                
                if (err) {
                    response.writeHead(400);
                    response.end("something went wrong");
                    response.end();
                
                } else {
                    response.end("File Updated");
                    response.end();
                }
            });
        });
        
    } if (request.url === "/delete-file" && request.method === "DELETE") {

        let body = "";

        request.on("data", function (data) {
            body += data.toString();
        });

        request.on("end", function () {
            
            let parsedBody = JSON.parse(body);

            fs.unlink(parsedBody.filename, function (err) {

                if (err) {
                    response.writeHead(400);
                    response.end("something went wrong");
                    response.end();

                } else {
                    response.end("File Deleted");
                    response.end();
                }
            });
        }); 
    };
});

server.listen(port);
console.log(`Server is now up running @ port ${port}`);
