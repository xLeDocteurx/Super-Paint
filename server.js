let http = require('http');
let url = require('url');

let fs = require('fs');
// let server = http.createServer(function(req, res) {

//   res.writeHead(200, {"Content-Type" : "text/html"});

//   res.end("<p>Voici un paragraphe <strong>HTML</strong> !</p>");

// });

let html = `
              <header>
                Header
              </header>
              <main>
                Main
              </main>
              <footer>
                Footer
              </footer>
`;

let server = http.createServer();

server.on('request', (request, response) => {
  // console.log(`
  // Il y a eu une requete : ${request} \n
  // Et une réponse : ${response }
  // `);
  // console.log(request);
  // console.log(respons
  
  fs.readFile('index.html', (err,data) => {
    
    if (err) {
      response.writeHead(404);
      response.end(`Ce fichier n'éxiste pas !`)
      
    } else {

      response.writeHead(200, {
        'Content-Type' : 'text/html; charset=utf-8'
      });

      // console.log(url.parse(request.url));
      // console.log(url.parse(request.url));
    }
    response.end(data);
  })

  // reponse.write(fileData); // data ???
  // response.addTrailers({"Content-MD5" : "7895bf4b8828b55ceaf47747b4bca667"});
});

server.listen(8080);