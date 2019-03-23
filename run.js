var http = require('http');
var url = require('url');

const actions = ["stay","move","eat","load","unload"]
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
            let response ={}

            //Hive object from request payload
            let hive = JSON.parse(body);

            

            function searchStepsAnt(ant){
               //console.log("---------" + ant );
                const arrSteps = hive.map.cells.slice();
                function scanCell(y, x, contStep){
                   // console.log("---------" + y +x + contStep );
                    // //проверка вверху
                    if(y != 0){
                        if((Object.keys(arrSteps[y-1][x]).length === 0) || ((arrSteps[y-1][x].hive == hive.id) && (!arrSteps[y-1][x].hasOwnProperty("ant")))) {
                            arrSteps[y-1][x].contSteps = contStep;
                        }
                    }   
                    //проверка вправо
                    if(x+1 != arrSteps[y].length){
                        if((Object.keys(arrSteps[y][x+1]).length === 0) || ((arrSteps[y][x+1].hive == hive.id) && (!arrSteps[y][x+1].hasOwnProperty("ant")))) {
                            arrSteps[y][x+1].contSteps = contStep;
                        }
                    }    
                    // //проверка вниз
                    if(y+1 != arrSteps.lengt){
                        if((Object.keys(arrSteps[y+1][x]).length === 0) || ((arrSteps[y+1][x].hive == hive.id) && (!arrSteps[y+1][x].hasOwnProperty("ant")))) {
                            arrSteps[y+1][x].contSteps = contStep;
                        }
                    }   
                    // //проверка влево
                    if(x != 0){
                        if((Object.keys(arrSteps[y][x-1]).length === 0) || ((arrSteps[y][x-1].hive == hive.id) && (!arrSteps[y][x-1].hasOwnProperty("ant")))) {
                            arrSteps[y][x-1].contSteps = contStep;
                        }
                    }   
                }
                scanCell(ant.y, ant.x, 55);

                 console.log(arrSteps);



            }

            //Loop through ants and give orders
            for (let antId in hive.ants) {
                //console.log(hive.ants[antId]);
                searchStepsAnt(hive.ants[antId]);






             // let random_act = Math.floor(Math.random() * 4);
             // let random_dir = Math.floor(Math.random() * 4);
                response[antId] = {
              //    "act":actions[random_act],
                //  "dir":directions[random_dir]
                }
            }

            // json format sample:
            // {"1":{"act":"load","dir":"down"},"17":{"act":"load","dir":"up"}}
            res.end(JSON.stringify(response));
            console.log("Tick:", hive.tick, response)
        });
    } else {
        res.end("only POST allowed");
    }
}).listen(7070);
