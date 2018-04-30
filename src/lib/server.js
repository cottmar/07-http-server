'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          date: new Date(),
        }));
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/cowsayPage') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cowsayText = cowsay.say({ text: parsedRequest.url.query.text });
        res.write(`<section><main>More Cowbell</main><pre>${cowsayText}</pre></section>`);
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsayPage') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
        }));
  
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsayPage') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
        }));
  
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/echo') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(parsedRequest.body));
        res.end();
        return undefined;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('NOT FOUND');
      res.end();
      return undefined;
    })
    .catch((err) => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('BAD REQUEST', err);
      res.end();
      return undefined;
    });
});

server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
