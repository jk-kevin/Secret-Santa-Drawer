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
app.use(express.urlencoded()); //extract form data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html') // send html file to client
  //res.sendFile('/html/index.html', {root: __dirname})
  app.use(express.static(path.join(__dirname, 'html'))); //send static files like .js files to client
  app.use(express.static(path.join(__dirname, 'public'))); //send static files like .css files to client
});
app.post('/send-email', (req, res) => {
  let data = req.body;
  console.log(data);
  console.log(Object.keys(data).length); // num of keys in data
  let numValues = Object.keys(data).length - 1;
  let participants = new Map();
  let values = Object.values(data); // parse data from object to array

  // pair names with emails
  for (let i = 0; i < numValues-1; i+=2) {
    participants.set(values[i], values[i+1]);
  }
  console.log("paired map");
  console.log(participants);
  
  // draw names then send emails
  drawNames(participants);
  //sendEmails(participants, drawNames(participants));


  res.end()
});

//Start the server using express
app.listen(port, () => {
  console.log('Listening on port 3000!');
  console.log('Test at http://127.0.0.1:3000/');
});

function drawNames(names) { // we probably don't need a callback here
  let result = new Map();
  let givers = Array.from(names.keys())[0]; // dunno why I get an array nested in another block
  let receivers = [...givers]; //spread operator to duplicate array instead of refrencing it
  let numPlayers = givers.length;

  //console.log("givers = " + givers + typeof givers);
  //console.log(givers);
  //console.log(receivers);
  //console.log("numPlayers = " + numPlayers); // THE NUMBER OF PLAYERS IS WRONG!!!
  for (let i = 0; i < numPlayers; i++) {
    while (true) {
      let randomInt = Math.floor(Math.random() * numPlayers);

      if (randomInt !== i && receivers[randomInt] !== null) {
        result.set(givers[i], receivers[randomInt]);
        receivers[randomInt] = null;
        break;
      }
    }
  }
  console.log("final list");
  console.log(result);
  return result;
}

function sendEmails(names, pairings) {
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
}