const http = require('http');

const PORT = 7070;
const actions = ['stay', 'move', 'eat', 'take', 'put'];
const directions = ['up', 'down', 'right', 'left'];

/**
 * This is just an example.
 * For example, we give random orders to ants.
 * Your bot will have to be more complex and change the strategy
 * based on the information on the map (payload.canvas).
 * Payload example https://github.com/anthive/js/blob/master/payload.json
 * Return should look something like this.
 *  { orders: [
 *    { antId: 1, act: 'move', dir: 'down' },
 *    { antId: 17, act: 'move', dir: 'up' },
 *  ]}
 *  More information https://anthive.io/rules/
 */
const strategy = (payload) => {
  const orders = [];

  for (const ant of payload.ants) {
    const randomNumber = Math.floor(Math.random() * 3);
    const randomDirections = directions[randomNumber];

    const order = {
      antId: ant.id,
      act: 'move',
      dir: randomDirections,
    };
    orders.push(order);
  }

  return { orders };
};

/**
 * Creating a bot server.
 * Sim will make http post request to your bot each tick.
 */
const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.end('only POST allowed');
    return;
  }

  let body = '';

  // Reading request body with information about map and ants
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  // Apply the strategy and send the result
  req.on('end', () => {
    const payload = JSON.parse(body);
    const response = JSON.stringify(strategy(payload));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(response);
  });
});

server.listen(PORT);

/**
 * This code available at https://github.com/anthive/js
 * to test it localy, submit post request with payload.json using postman or curl
 * curl -X 'POST' -d @payload.json http://localhost:7070
 */
