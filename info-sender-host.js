const http = require('http');
const ipGeolocate = require('ip-geolocate');
const port = 8032;
const host = 'localhost';

http.createServer((request, response) => {
    ipGeolocate.getLocation(request.url.replace('/', ''), (err, location) => {
        if (err) {
            console.log(err);
        }

        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(location, null, 4));
        response.end();

        console.log(location);
    });
}).listen(port, host);

console.log(`HTTP server listening on ${host}:${port}`);