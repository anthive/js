var http = require('http');
var url = require('url');

// available actions and directions
const actions = ["stay","move","eat","take","put"]
const directions = ["up","down","right","left"]

// starting listen for http calls on port :7070
http.createServer(function(req, res) {

    // your bot respons should be json object
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    // sim will make http post request to your bot
    if (req.method === 'POST') {

        // prepare response json object
        let response = { "orders": [] }

        // reading request body with information about map and ants
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {

            // parce json from request body
            let request = JSON.parse(body)
            
            // loop through ants and give orders
            for (let i in request.ants) {

                // pick random direction from array on line 6
                let random_number = Math.floor(Math.random() * 3);
                let random_directions = directions[random_number]
              
                // create order object (move to random direction)
                let order = {
                    "antId": request.ants[i].id,
                    "act": "move",
                    "dir": random_directions
                }

                // add order to your response object from line 20
                response.orders.push(order)
            }

            // finish your response and send back json to 
            res.end(JSON.stringify(response));

            // response json should look something like this
            // {"orders": [
            //	 {"antId":1,"act":"move","dir":"down"},
            //	 {"antId":17,"act":"move","dir":"up"}
            //	]}
        });
    } else {
        res.end("only POST allowed");
    }
}).listen(7070);

// this code available at https://github.com/anthive/js
// to test it localy, submit post request with payload.json using postman or curl
// curl -X 'POST' -d @payload.json http://localhost:7070

// have fun!

