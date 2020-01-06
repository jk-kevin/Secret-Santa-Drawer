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
  let participants = new Map();
  let values = Object.values(data); // parse data from object to array
  let numValues = values[0].length;

  // pair names with emails
  for (let i = 0; i < numValues; i++) {
    participants.set(values[0][i], values[1][i]);
  }
  console.log("paired map");
  console.log(participants);
  // draw names then send emails
  sendEmails(participants, drawNames(participants));
  res.end()
});

//Start the server using express
app.listen(port, () => {
  console.log('Listening on port 3000!');
  console.log('Test at http://127.0.0.1:3000/');
});

function drawNames(names) {
  let result = new Map();
  let givers = Array.from(names.keys());
  let receivers = [...givers]; //spread operator to duplicate array instead of refrencing it
  let numPlayers = givers.length;

  console.log("Drawing names!");  // it doesn't work when there is no console.log in this function?
  for (let i = 0; i < numPlayers; i++) {
    while (true) {
      let randomInt = Math.floor(Math.random() * numPlayers);

      //console.log(i);
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

function sendEmails(namesEmails, pairings) { //using nodemailer
  let players = Array.from(namesEmails.keys());
  let numPlayers = players.length;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'KevinSecretSantaBot@gmail.com',
      pass: 'HoHoHo123'
    }
  });

  for (let i = 0; i < numPlayers; i++) {
    let name = players[i];
    var mailOptions = {
      from: 'KevinSecretSantaBot@gmail.com',
      to: namesEmails.get(name),
      subject: 'Secret Santa Draw',
      text: 'You are giving to ' + pairings.get(name) 
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}