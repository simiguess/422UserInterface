
//local storage here
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("webData")) {
      const initialData = {
        contacts: [],
        balance: 1000,
        transactions: []
      };
      localStorage.setItem("webData", JSON.stringify(initialData));
    }
  });

function loadData() {//function to load data from local storage
    const webData = JSON.parse(localStorage.getItem("webData"));
    return webData;
}
function updateData(newData) {//function to update data in local storage
    localStorage.setItem("webData", JSON.stringify(newData));
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize localStorage if not already present
    if (!localStorage.getItem("webData")) {
      const initialData = {
        contacts: [],
        balance: 1000,
        transactions: []
      };
      localStorage.setItem("webData", JSON.stringify(initialData));
    }
  
    const appData = loadData();
  
    // Home page specific logic
    const balanceElement = document.getElementById("balance");
    const contactList = document.getElementById("contact-list");
    const transactionHistory = document.getElementById("transaction-history");
  
    if (balanceElement) {
      balanceElement.textContent = appData.balance.toFixed(2);
    }
  
    if (contactList) {
      appData.contacts.forEach(contact => {
        const newContact = document.createElement("div");
        newContact.classList.add("indiv-contact");
        newContact.innerHTML = `
          <i class="fa-solid fa-circle-user"></i>
          <div class="contact-body">
            <p style="font-weight: bold;">${contact.name}</p>
            <p style="font-size: 1rem; color: gray;">${contact.phone}</p>
          </div>
        `;
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
  
        deleteButton.addEventListener("click", function () {
          contactList.removeChild(newContact);
          const index = appData.contacts.findIndex(c => c.name === contact.name && c.phone === contact.phone);
          if (index !== -1) {
            appData.contacts.splice(index, 1);
            updateData(appData);
          }
        });
  
        newContact.appendChild(deleteButton);
        contactList.appendChild(newContact);
      });
    }
  
    if (transactionHistory) {
      appData.transactions.forEach(transaction => {
        const newTransaction = document.createElement("div");
        newTransaction.textContent = `${transaction.type} - $${transaction.amount} on ${new Date(transaction.date).toLocaleDateString()}`;
        transactionHistory.appendChild(newTransaction);
      });
    }
  
    // Send Gift page logic
    const giftContactList = document.getElementById("gcontacts");
    if (giftContactList) {
      appData.contacts.forEach(contact => {
        const newContact = document.createElement("div");
        newContact.classList.add("indiv-contact");
        newContact.innerHTML = `
          <i class="fa-solid fa-circle-user"></i>
          <div class="contact-body">
            <p style="font-weight: bold;">${contact.name}</p>
            <p style="font-size: 1rem; color: gray;">${contact.phone}</p>
          </div>
          <button class="send-gift-button" onclick="sendGift()">
            <i class="fa-solid fa-gift"></i>
            <p>Send Gift</p>
          </button>
        `;
        giftContactList.appendChild(newContact);
      });
    }
  });
  
  function loadData() {
    return JSON.parse(localStorage.getItem("webData"));
  }
  
  function updateData(newData) {
    localStorage.setItem("webData", JSON.stringify(newData));
  }
  



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
  
function profileBtn(){
    window.location.href = 'profile.html';
}
function notificationsBtn(){
    window.location.href = 'notifications.html';
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

document.getElementById("withdraw-button").addEventListener("click", function () {
    document.getElementById("withdraw-container").style.display = "block";
  });
  
  document.getElementById("submit-withdraw").addEventListener("click", function () {
    const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
  
    const appData = loadData();
    if (withdrawAmount > appData.balance) {
      alert("Insufficient balance.");
      return;
    }
  
    appData.balance -= withdrawAmount;
    appData.transactions.push({ type: "withdraw", amount: withdrawAmount, date: new Date().toISOString() });
    updateData(appData);
  
    document.getElementById("balance").textContent = appData.balance.toFixed(2);
    document.getElementById("withdraw-container").style.display = "none";
    document.getElementById("withdraw-amount").value = "";
  });
  
  document.getElementById("deposit-button").addEventListener("click", function () {
    document.getElementById("deposit-container").style.display = "block";
  });
  
  document.getElementById("submit-deposit").addEventListener("click", function () {
    const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
  
    const appData = loadData();
    appData.balance += depositAmount;
    appData.transactions.push({ type: "deposit", amount: depositAmount, date: new Date().toISOString() });
    updateData(appData);
  
    document.getElementById("balance").textContent = appData.balance.toFixed(2);
    document.getElementById("deposit-container").style.display = "none";
    document.getElementById("deposit-amount").value = "";
  });



// Show the Add Contact modal
function openAddContactModal() {
    const modal = document.getElementById("add-contact-modal");
    modal.style.display = "block";
  }
  
  // Close the Add Contact modal
  function closeAddContactModal() {
    const modal = document.getElementById("add-contact-modal");
    modal.style.display = "none";
  }
  
  // Handle the submission of the Add Contact form
  function submitAddContact() {
    const webData = loadData();
    const contactName = document.getElementById("contact-name").value.trim();
    const contactPhone = document.getElementById("contact-phone").value.trim();
  
    if (!contactName || !contactPhone) {
      alert("Please enter both name and phone number.");
      return;
    }
  
    // Add the contact to the contact list
    const contactList = document.getElementById("contact-list"); // Assuming this is the ID of your contact list container
  
    // Create the outer div for the contact
    const newContact = document.createElement("div");
    newContact.classList.add("indiv-contact");
      const userIcon = document.createElement("i");
    userIcon.classList.add("fa-solid", "fa-circle-user");
  
    const contactBody = document.createElement("div");
    contactBody.classList.add("contact-body");
  
    const nameParagraph = document.createElement("p");
    nameParagraph.style.fontWeight = "bold";
    nameParagraph.textContent = contactName;
  
    const phoneParagraph = document.createElement("p");
    phoneParagraph.style.fontSize = "1rem";
    phoneParagraph.style.color = "gray";
    phoneParagraph.textContent = contactPhone;
  
    // Append the name and phone to the contact body
    contactBody.appendChild(nameParagraph);
    contactBody.appendChild(phoneParagraph);
  
    // Append the user icon and contact body to the outer div
    newContact.appendChild(userIcon);
    newContact.appendChild(contactBody);

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "5px";
    deleteButton.style.cursor = "pointer";

    deleteButton.addEventListener("click", function () {
    contactList.removeChild(newContact);

    // Remove the contact from local storage
    const index = webData.contacts.findIndex(contact => contact.name === contactName && contact.phone === contactPhone);
        if (index !== -1) {
            webData.contacts.splice(index, 1);
            updateData(webData);
        }
        alert("Contact deleted successfully.");
    });

    newContact.appendChild(deleteButton);

    //update local storage
    webData.contacts.push({
        name: contactName,
        phone: contactPhone
        });
    updateData(webData);

    const firstChild = contactList.firstChild;
    contactList.insertBefore(newContact, firstChild);

    document.getElementById("contact-name").value = "";
    document.getElementById("contact-phone").value = "";
  
    closeAddContactModal();
  }

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