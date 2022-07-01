// https://gist.githubusercontent.com/aolde/8104861/raw/4418ddc5b16b1f3dd8a38c3ffb13de996d1120ee/static_server.js
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888,
    mimeTypes = {
      "html": "text/html",
      "jpeg": "image/jpeg",
      "jpg": "image/jpeg",
      "png": "image/png",
      "svg": "image/svg+xml",
      "json": "application/json",
      "js": "text/javascript",
      "css": "text/css"
    };
 
http.createServer(function(request, response) {
 
  var uri = url.parse(request.url).pathname, 
      filename = path.join(process.cwd(), uri);
  
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("404 Not Found\n");
      response.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) 
      filename += '/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      
      var mimeType = mimeTypes[filename.split('.').pop()];
      
      if (!mimeType) {
        mimeType = 'text/plain';
      }
      
      response.writeHead(200, { "Content-Type": mimeType });
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

// https://github.com/evanw/esbuild/issues/21#issuecomment-625418280
var chokidar = require('chokidar');
var watcher = chokidar.watch('src', {persistent: true});
watcher.on('change', () => {
  console.clear();
  console.log("Rebuild triggered");
  require('esbuild').build({
       entryPoints: ['./src/init.ts'],
       outfile: `dist/out.js`,
       minify: false,
       bundle: true,
       sourcemap: true,
  }).then(() => {console.log("Build Success!");})
    .catch(() => {console.log("Build failed!");});

  fs.copyFile('node_modules/xterm/css/xterm.css', 'stylesheets/xterm.css', () => {});
});

console.log("Watching for file changes in src/**/*.ts");
