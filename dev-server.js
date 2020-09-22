const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const port = process.argv[2] || 5000;

http
  .createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);

    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;
    const ext = path.parse(pathname).ext || ".html";
    const ContentType = {
      ".ico": "image/x-icon",
      ".html": "text/html",
      ".js": "text/javascript",
      ".json": "application/json",
      ".css": "text/css",
      ".pbf": "application/octet-stream",
    };

    fs.exists(pathname, function (exist) {
      if (!exist) {
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }

      // if is a directory search for index file matching the extention
      if (fs.statSync(pathname).isDirectory()) {
        pathname += "index" + ext;
      }

      // read file from file system
      fs.readFile(pathname, function (err, data) {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
          return;
        }

        res.setHeader("Content-type", ContentType[ext] || "text/plain");
        res.end(data);
      });
    });
  })
  .listen(parseInt(port));

console.log(`Server listening on port ${port}`);
