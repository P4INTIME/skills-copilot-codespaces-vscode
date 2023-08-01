// create web server
// 1. create web server
// 2. read comments.json
// 3. parse comments.json
// 4. get comments
// 5. post comments
// 6. delete comments
// 7. update comments
// 8. save comments.json
// 9. listen to port 3000

// 1. create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const app = http.createServer((req, res) => {
    const _url = req.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    const title = queryData.id;

    // 2. read comments.json
    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', (err, files) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('500 Internal Server Error');
                }
                fs.readFile(`./data/${files[0]}`, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end('500 Internal Server Error');
                    }
                    const title = files[0].slice(0, -5);
                    const description = data;
                    const template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        <ul>
                            <li><a href="/?id=HTML">HTML</a></li>
                            <li><a href="/?id=CSS">CSS</a></li>
                            <li><a href="/?id=JavaScript">JavaScript</a></li>
                        </ul>
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                    `;
                    res.writeHead(200);
                    res.end(template);
                });
            });