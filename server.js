/*
Kevin Vuong
December 31, 2019
Secret-Santa-Drawer
*/

//Load HTTP module
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser'); // for http post messages
const nodemailer = require('nodemailer');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

//provide static server
//app.use(express.static(__dirname + '/html'));

app.use(express.urlencoded()); //extract form data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html') // send html file to client
  //res.sendFile('/html/index.html', {root: __dirname})
  app.use(express.static(path.join(__dirname, 'html'))); //send static files like .js files to client
  app.use(express.static(path.join(__dirname, 'public'))); //send static files like .css files to client
});
app.post('/send-email', (req, res) => {
  console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'KevinSecretSantaBot@gmail.com',
      pass: 'HoHoHo123'
    }
  });

  var mailOptions = {
    from: 'KevinSecretSantaBot@gmail.com',
    to: 'secretsantamailtest@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.end()
});

//Start the server using express
app.listen(port, () => {
  console.log('Listening on port 3000!');
  console.log('Test at http://127.0.0.1:3000/');
});


