var http = require('http');
var url = require('url');

const actions = ["stay","move","eat","take","put"]
const directions = ["up","down","right","left"]

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {

            let request = JSON.parse(body)
            let response ={"orders":[]}
            //Loop through ants and give orders
            for (let i in request.ants) {
              let random_act = Math.floor(Math.random() * 4);
              let random_dir = Math.floor(Math.random() * 3);
              let order = {
                  "antId": request.ants[i].id,
                  "act": actions[random_act],
                  "dir": directions[random_dir]
                }
              response.orders.push(order)
            }
            res.end(JSON.stringify(response));

            console.log(JSON.stringify(response))
            // {"orders": [
            //	 {"antId":1,"act":"move","dir":"down"},
            //	 {"antId":17,"act":"load","dir":"up"}
            //	]}
        });
    } else {
        res.end("only POST allowed");
    }
}).listen(7070);
