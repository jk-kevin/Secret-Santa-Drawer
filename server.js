/*
Kevin Vuong
December 31, 2019
What-to-Eat
*/

//Load HTTP module
const express = require('express')
const path = require('path')
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

//provide static server
//app.use(express.static(__dirname + '/html'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html') // send html file to client
  //res.sendFile('/html/index.html', {root: __dirname})
  app.use(express.static(path.join(__dirname, 'html'))); //send static files like .js files to client
  app.use(express.static(path.join(__dirname, 'public'))); //send static files like .css files to client
});
//Start the server using express
app.listen(port, () => {
  console.log('Listening on port 3000!');
  console.log('Test at http://127.0.0.1:3000/');
});