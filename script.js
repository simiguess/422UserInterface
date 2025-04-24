function loginBtn() {
    window.location.href = 'homepage.html';
}
function createAct() {
    window.location.href = 'create_account.html';
}
function register() {
  const pass1 = document.getElementById("pass1").value;
  const pass2 = document.getElementById("pass2").value;
  const email = document.getElementById("emailinputreg").value;
  let help = document.getElementById("passhelp");
  if(pass1 == pass2 && (pass1 != "" || pass2 != "")){
    window.location.href = 'homepage.html';
  }
  else if(email == ""){
    help.style.color = "red";
    help.textContent = "Email Cannot Be Empty";
  }
  else if(pass1 == '' && pass2 == ''){
    help.style.color = "red";
    help.textContent = "Password Cannot Be Empty";
  }
  else{
    help.style.color = "red";
    help.textContent = "Passwords Do Not Match";
  }
  
}
function logoutBtn() {
    window.location.href = 'index.html';
}

function homeBtn() {
    window.location.href = 'homepage.html';
}

function sendGiftBtn() {
    window.location.href = 'sendgift.html';
}
function transactionsBtn() {
    window.location.href = 'transactionhistory.html';
}

let balance = 1000; // Initial balance

// Show the withdraw input and submit button when "Withdraw" is clicked
document.getElementById("withdraw-button").addEventListener("click", function () {
  const withdrawContainer = document.getElementById("withdraw-container");
  withdrawContainer.style.display = "block"; // Show the input and submit button
});

// Handle the withdrawal when the submit button is clicked
document.getElementById("submit-withdraw").addEventListener("click", function () {
  const withdrawInput = document.getElementById("withdraw-amount");
  const withdrawAmount = parseFloat(withdrawInput.value);

  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  if (withdrawAmount > balance) {
    alert("Insufficient balance.");
    return;
  }

  balance -= withdrawAmount; // Deduct the amount
  document.getElementById("balance").textContent = balance.toFixed(2); // Update balance display
  withdrawInput.value = ""; // Clear the input field

  // Hide the withdraw container after submission
  document.getElementById("withdraw-container").style.display = "none";
});

// Show the deposit input and submit button when "Deposit" is clicked
document.getElementById("deposit-button").addEventListener("click", function () {
  const depositContainer = document.getElementById("deposit-container");
  depositContainer.style.display = "block"; // Show the input and submit button
});

// Handle the deposit when the submit button is clicked
document.getElementById("submit-deposit").addEventListener("click", function () {
  const depositInput = document.getElementById("deposit-amount");
  const depositAmount = parseFloat(depositInput.value);

  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  balance += depositAmount; // Add the amount
  document.getElementById("balance").textContent = balance.toFixed(2); // Update balance display
  depositInput.value = ""; // Clear the input field

  // Hide the deposit container after submission
  document.getElementById("deposit-container").style.display = "none";
});



//contacts

let contacts = []; // Array to store contacts

document.getElementById("add-contact-button").addEventListener("click", function () {
    const contactNameInput = document.getElementById("contact-name");
    const contactName = contactNameInput.value.trim();
  
    if (contactName === "") {
      alert("Please enter a valid contact name.");
      return;
    }
  
    const contactList = document.getElementById("contact-list");
    const giftContactList= document.getElementById("gift-contact-list");
  
    // Create the outer div for the contact
    const newContact = document.createElement("div");
    newContact.classList.add("indiv-contact");
  
    // Create the user icon
    const userIcon = document.createElement("i");
    userIcon.classList.add("fa-solid", "fa-circle-user");
  
    // Create the contact description div 
    const contactBody = document.createElement("div");
    contactBody.classList.add("contact-body");
  
    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.border = "none";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", function () {
      contactList.removeChild(newContact);
    });
    deleteButton.style.borderRadius = "5px";

    // Create the name paragraph from user input
    const nameParagraph = document.createElement("p");
    nameParagraph.style.fontWeight = "bold";
    nameParagraph.textContent = contactName;
  
    // Create the description paragraph
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.style.color = "gray";
    descriptionParagraph.textContent = "Hello, I am a contact, beer me.";
  
    // Add the name and description to the contact body
    contactBody.appendChild(nameParagraph);
    contactBody.appendChild(descriptionParagraph);
  
    newContact.appendChild(deleteButton);

    // Add the user icon and contact body to the outer div
    newContact.appendChild(userIcon);
    newContact.appendChild(contactBody);
  
    contactList.appendChild(newContact);
    giftContactList.appendChild(newContact.cloneNode(true)); // Clone the contact for the gift list
    // Add the contact to the contacts array
    contacts.push(contactName);
  
    // Clear the input field
    contactNameInput.value = "";

  });

//function to select contact to send gift
function sendGift() {
    // Display the modal
    const modal = document.getElementById("gift-modal");
    modal.style.display = "block";
  }
  
  function closeModal() {
    // Hide the modal
    const modal = document.getElementById("gift-modal");
    modal.style.display = "none";
  }
  
  function confirmGift() {
    // Get the gift type and amount
    const giftType = document.getElementById("gift-type").value.trim();
    const giftAmount = document.getElementById("gift-amount").value.trim();
  
    if (!giftType || !giftAmount || giftAmount <= 0) {
      alert("Please enter a valid gift type and amount.");
      return;
    }
  
    // Confirmation message
    alert(`Gift of ${giftAmount} (${giftType}) has been sent!`);
  
    // Close the modal
    closeModal();
  
    // Optionally, clear the input fields
    document.getElementById("gift-type").value = "";
    document.getElementById("gift-amount").value = "";
  }