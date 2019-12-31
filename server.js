/*
  Kevin Vuong
  June 16, 2019
  Personal Website
*/


//Load HTTP module
const express = require('express')
const path = require('path')
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

//Start the server using express
app.get('/', (req, res) => {
  //res.send('Hello World!')

//app.use(express.static(__dirname + '/html/styles'))


res.sendFile(__dirname + '/html/index.html') // send html file to client
app.use(express.static(path.join(__dirname, 'public'))); //send static files like .css files to client
});

//provide static server


app.listen(port, () => {
  console.log('Listening on port 3000!')
  console.log('Test at http://127.0.0.1:3000/')
});
