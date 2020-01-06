/*
Kevin Vuong
December 31, 2019
Secret-Santa-Drawer
*/

function addParticipantFields() {
  let numberParticipants = document.getElementsByClassName("participant").length;
  let newNum = numberParticipants + 1;

  //create main div
  let participantDiv = document.createElement("div");
  participantDiv.setAttribute("class", "participant");

  //create paragraph
  let para = document.createElement("p");
  let text = document.createTextNode(newNum + ".");
  para.appendChild(text);

  //create name input
  let nameInputDiv = document.createElement("div");
  nameInputDiv.setAttribute("class", "inputBox");
  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "inputBox");
  let nameLabelText = document.createTextNode("Name");
  nameLabel.appendChild(nameLabelText);
  let nameInput = document.createElement("input");
  nameInput.setAttribute("for", "inputBox");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "nameInput");
  nameInputDiv.appendChild(nameLabel);
  nameInputDiv.appendChild(nameInput);

  //create email input
  let emailInputDiv = document.createElement("div");
  emailInputDiv.setAttribute("class", "inputBox");
  let emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "inputBox");
  let emailLabelText = document.createTextNode("Email");
  emailLabel.appendChild(emailLabelText);
  let emailInput = document.createElement("input");
  emailInput.setAttribute("for", "inputBox");
  emailInput.setAttribute("type", "text");
  emailInput.setAttribute("name", "emailInput");
  emailInputDiv.appendChild(emailLabel);
  emailInputDiv.appendChild(emailInput);

  // add to main div
  participantDiv.appendChild(para);
  participantDiv.appendChild(nameInputDiv);
  participantDiv.appendChild(emailInputDiv);

  let lineBreak = document.createElement("hr");

  // append to end of other participant fields
  document.getElementById("participantFields").appendChild(participantDiv);
  document.getElementById("participantFields").appendChild(lineBreak);
}