// ===== Navigation Functions =====
function homeBtn() { window.location.href = "homepage.html"; }
function sendGiftBtn() { window.location.href = "sendgift.html"; }
function reqGiftBtn() { window.location.href = "sendgift.html"; }
function transactionsBtn() { window.location.href = "transactionhistory.html"; }
function logoutBtn() { window.location.href = "index.html"; }

// ===== Local Storage Utilities =====
function getContacts() {
  return JSON.parse(localStorage.getItem('contacts')) || [];
}

function saveContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function getTransactions() {
  return JSON.parse(localStorage.getItem('transactions')) || [];
}

function saveTransactions(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ===== Wallet Utilities =====
function loadWalletBalance() {
  let savedBalance = localStorage.getItem('walletBalance');
  if (!savedBalance) {
    savedBalance = 1000; // starting demo balance
    localStorage.setItem('walletBalance', savedBalance);
  }
  const balanceElement = document.getElementById('balance');
  if (balanceElement) {
    balanceElement.innerText = parseFloat(savedBalance).toFixed(2);
  }
}

function animateBalanceChange(targetValue) {
  let balanceElement = document.getElementById('balance');
  if (!balanceElement) return;

  let current = parseFloat(balanceElement.innerText);
  let step = (targetValue - current) / 20;
  let counter = 0;

  const interval = setInterval(() => {
    current += step;
    counter++;
    balanceElement.innerText = current.toFixed(2);
    if (counter >= 20) {
      balanceElement.innerText = parseFloat(targetValue).toFixed(2);
      clearInterval(interval);
    }
  }, 20);
}

function saveTransaction(type, amount, recipient = "-") {
  const now = new Date();
  const dateStr = now.toLocaleString();
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  const transaction = {
    date: dateStr,
    type: type,
    amount: amount,
    recipient: recipient,
    confirmationCode: code
  };

  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
}

// ===== Contact Management =====
const addContactButton = document.getElementById('add-contact-button');
if (addContactButton) {
  addContactButton.addEventListener('click', () => {
    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    
    if (name === "" || phone === "") {
      alert("Please fill in both the name and phone number!");
      return;
    }
    
    const contacts = getContacts();  // getContacts() now will return an array of objects
    contacts.push({ name: name, phone: phone });
    saveContacts(contacts);
    
    nameInput.value = '';
    phoneInput.value = '';
    displayContact({ name: name, phone: phone });
  });
}


function loadGiftContacts() {
  const giftContactBody = document.getElementById('gift-contact-body');
  const searchInput = document.getElementById('contact-search');
  if (!giftContactBody) return;
  
  // Function to render contacts based on search value
  function renderContacts() {
    giftContactBody.innerHTML = ''; // clear previous entries
    const query = searchInput.value.toLowerCase();
    const contacts = getContacts(); // get all contacts (array of objects)
    contacts.forEach(contact => {
      // if search is empty or matches name/phone, display it
      if (!query || contact.name.toLowerCase().includes(query) || contact.phone.includes(query)) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.phone}</td>
          <td>
            <button class="btn btn-dark send-btn" onclick="openSendModal('${contact.name}')">Send Money</button>
            <button class="btn btn-secondary request-btn" onclick="openRequestModal('${contact.name}')">Request Money</button>
          </td>
        `;
        giftContactBody.appendChild(row);
      }
    });
  }
  
  // Render initially
  renderContacts();
  
  // Add event listener for search input changes:
  searchInput.addEventListener('input', renderContacts);
}

// Call loadGiftContacts when DOM is ready for sendgift page
window.addEventListener('DOMContentLoaded', loadGiftContacts);


function displayContact(name) {
  const contactList = document.getElementById('contacts');
  if (contactList) {
    const li = document.createElement('li');
    li.className = "indiv-contact";
    li.innerHTML = `
      <div class="contact-body">
        <strong>${contact.name}</strong><br>
        <span>${contact.phone}</span>
      </div>
    `;
    contactList.appendChild(li);
  }
}

// ===== Gift Modal Logic =====
let selectedRecipient = "";
let actionType = ""; // "Send" or "Request"

function openSendModal(name) {
  selectedRecipient = name;
  actionType = "Send";
  document.getElementById('gift-recipient-name').textContent = name;
  document.querySelector("#gift-modal h2").textContent = `Send Money to ${name}`;
  document.getElementById('gift-modal').style.display = 'block';
}

function openRequestModal(name) {
  selectedRecipient = name;
  actionType = "Request";
  document.getElementById('gift-recipient-name').textContent = name;
  document.querySelector("#gift-modal h2").textContent = `Request Money from ${name}`;
  document.getElementById('gift-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('gift-modal').style.display = 'none';
}

function confirmGift() {
  const giftType = document.getElementById('gift-type').value.trim();
  const giftAmount = parseFloat(document.getElementById('gift-amount').value.trim());

  if (giftType === "" || isNaN(giftAmount) || giftAmount <= 0) {
    alert("Please fill out both fields with valid values!");
    return;
  }

  let currentBalance = parseFloat(localStorage.getItem('walletBalance'));
  if (giftAmount > currentBalance) {
    alert("Not enough funds to send this gift!");
    return;
  }

  // Update wallet
  let newBalance = currentBalance - giftAmount;
  localStorage.setItem('walletBalance', newBalance);
  animateBalanceChange(newBalance);

  // Save transaction
  saveTransaction("Gift Sent", -giftAmount, selectedRecipient);

  // Close modal
  closeModal();
  alert(`${actionType} recorded with ${selectedRecipient} 🎉`);
  document.getElementById('gift-type').value = '';
  document.getElementById('gift-amount').value = '';
}

// ===== Transaction History Loader =====
const transactionBody = document.getElementById('transaction-body');
if (transactionBody) {
  window.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
  });
}

function loadTransactions() {
  const transactionBody = document.getElementById('transaction-body');
  if (!transactionBody) return;

  const transactions = getTransactions();
  transactions.reverse()
  transactions.forEach(tx => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tx.date}</td>
      <td>$${parseFloat(tx.amount).toFixed(2)}</td>
      <td>${tx.type}${tx.recipient !== "-" ? ` to ${tx.recipient}` : ""}</td>
      <td>${tx.confirmationCode}</td>
    `;
   // node.insertBefore(transactions, row)
    transactionBody.appendChild(row);
  });
}

// ===== Wallet Deposit / Withdraw =====
const withdrawButton = document.getElementById('withdraw-button');
const depositButton = document.getElementById('deposit-button');

if (withdrawButton && depositButton) {
  withdrawButton.addEventListener('click', () => {
    document.getElementById('withdraw-container').style.display = 'block';
  });

  depositButton.addEventListener('click', () => {
    document.getElementById('deposit-container').style.display = 'block';
  });

  document.getElementById('submit-withdraw').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('withdraw-amount').value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid withdraw amount.");
      return;
    }
    let currentBalance = parseFloat(localStorage.getItem('walletBalance'));
    if (amount > currentBalance) {
      alert("Insufficient funds!");
      return;
    }
    let newBalance = currentBalance - amount;
    localStorage.setItem('walletBalance', newBalance);
    animateBalanceChange(newBalance);

    saveTransaction("Withdraw", amount);
    alert("Withdrawal successful!");
  });

  document.getElementById('submit-deposit').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('deposit-amount').value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }
    let currentBalance = parseFloat(localStorage.getItem('walletBalance'));
    let newBalance = currentBalance + amount;
    localStorage.setItem('walletBalance', newBalance);
    animateBalanceChange(newBalance);

    saveTransaction("Deposit", amount);
    alert("Deposit successful!");
  });
}






// ====== Load Wallet on Page Load =====
window.onload = () => {
  loadWalletBalance();
};
