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

app.get('/send-email-confirmation', (req, res) => {
  res.sendFile(__dirname + '/html/send-email-confirmation.html')
});

app.get('/send-email-failure', (req, res) => {
  res.sendFile(__dirname + '/html/send-email-failure.html')
});

app.post('/send-email', (req, res) => {
  let data = req.body;
  //let participants = new Map();
  let participants = [];
  let values = Object.values(data); // parse data from object to array
  //console.log("values: " + values);
  //console.log("values[0]: " + values[0][0]);
  //console.log("values[1]: " + values[1][0]);
  let numValues = values[0].length;

  // pair names with emails
  for (let i = 0; i < numValues; i++) {

    //participants.set(values[0][i], values[1][i]);
    participants[i] = [values[0][i], values[1][i]];
  }
  console.log("paired arr");
  console.log(participants);
  // draw names then send emails
  drawNames(participants, sendEmails);
  /*
  if (drawNames(participants, sendEmails)) { //use callback function instead
    res.redirect('/send-email-confirmation'); // redirect to confirmation
  }
  else {
    res.redirect('/send-email-failure');
  } */
  res.end()
});

//Start the server using express
app.listen(port, () => {
  console.log('Listening on port 3000!');
  console.log('Test at http://127.0.0.1:3000/');
});

function drawNames(names, callback) {
  
  let result = new Map();
  /*
  let givers = Array.from(names.keys());
  let receivers = [...givers]; //spread operator to duplicate array instead of refrencing it
  let numPlayers = givers.length;

  //console.log("Drawing names!");
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
  */
  shuffleArray(names, names.length);
  // create pairings
  let firstPerson = names[0];
  for (let i = 0; i < names.length - 1; i++) {
    result.set(names[i], names[i + 1]); // first is giver, second is receiver
  }
  result.set(names[names.length-1], firstPerson); // pair last person with first


  console.log("final list");
  console.log(result);
  callback(names, result);
}

function shuffleArray(arr, times) { // arrays are passed by refrence
  console.log(`before: ${arr}`);
  for (let i = 0; i < times; i++) {
    let randomInt = Math.floor(Math.random() * arr.length);
    // maybe it shouldn't swap with itself
    [arr[i], arr[randomInt]] = [arr[randomInt], arr[i]]; // use destructuring to swap
  }
  console.log(`after: ${arr}`);
}


function sendEmails(namesEmails, pairings) { //using nodemailer
  console.log("SENDING EMAILS");
  let emailSent = false;
  let givers = Array.from(pairings.keys());
  let receivers = Array.from(namesEmails.values());
  let numPlayers = pairings.size;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'KevinSecretSantaBot@gmail.com',
      pass: 'HoHoHo123'
    }
  });
  console.log('numPlayers = ' + numPlayers);
  for (let i = 0; i < numPlayers; i++) {
    console.log("SENDING EMAILS " + i);
    //let name = players[i];
    var mailOptions = {
      from: 'KevinSecretSantaBot@gmail.com',
      to: givers[i][1],
      subject: 'Secret Santa Draw',
      text: 'You are giving to ' + receivers[i][1]
    };
    console.log("mailOptions " + mailOptions.text);
    transporter.sendMail(mailOptions, function(error, info){ // i need to wait for this to complete
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        //emailSent = true;
      }
    });
  }
  //return emailSent; // this is being sent back before emailSent = true;, so it is always returning false. I will need to do a callback or promise to wait for the true to return
}