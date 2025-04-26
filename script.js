// ===== Navigation Functions =====
function homeBtn() {
  window.location.href = "homepage.html";
}

function sendGiftBtn() {
  window.location.href = "sendgift.html";
}

function reqGiftBtn() {
  window.location.href = "sendgift.html";
}

function transactionsBtn() {
  window.location.href = "transactionhistory.html";
}

function logoutBtn() {
  window.location.href = "index.html";
}

// ====== Local Storage Utilities =====
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

// ====== Contact Management (Homepage) =====
const addContactButton = document.getElementById('add-contact-button');
if (addContactButton) {
  addContactButton.addEventListener('click', () => {
    const nameInput = document.getElementById('contact-name');
    const name = nameInput.value.trim();
    if (name !== "") {
      const contacts = getContacts();
      contacts.push(name);
      saveContacts(contacts);
      nameInput.value = '';
      displayContact(name);
    }
  });
}

  // Load contacts when page loads
  const giftContactBody = document.getElementById('gift-contact-body');

if (giftContactBody) {
  window.addEventListener('DOMContentLoaded', () => {
    const contacts = getContacts(); // pull from localStorage

    contacts.forEach(name => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${name}</td>
        <td>
          <button class="btn btn-dark send-btn" onclick="openSendModal('${name}')">Send Money</button>
          <button class="btn btn-secondary request-btn" onclick="openRequestModal('${name}')">Request Money</button>
        </td>
      `;
      giftContactBody.appendChild(row);
    });
  });
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


function displayContact(name) {
  const contactList = document.getElementById('contacts');
  if (contactList) {
    const li = document.createElement('li');
    li.className = "indiv-contact";
    li.innerHTML = `
      <div class="contact-body">${name}</div>
    `;
    contactList.appendChild(li);
  }
}


// ====== Gift Modal Logic =====
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
  const giftAmount = document.getElementById('gift-amount').value.trim();


  
  if (giftType === "" || giftAmount === "") {
    alert("Please fill out both fields!");
    return;
  }

  const transactions = getTransactions();
  const date = new Date().toISOString().split('T')[0];
  const code = Math.random().toString(36).substring(2,8).toUpperCase();

  const actionDescription = `${actionType} (${giftType}) with ${selectedRecipient}`;

  transactions.push({
    date: date,
    amount: `-$${giftAmount}`,
    action: actionDescription,
    code: code
  });

  saveTransactions(transactions);

  if (isNaN(giftAmount) || giftAmount <= 0) {
    alert("Please enter a valid gift amount.");
    return;
  }
  let currentBalance = parseFloat(localStorage.getItem('walletBalance'));
  if (giftAmount > currentBalance) {
    alert("Not enough funds to send this gift!");
    return;
  }
  let newBalance = currentBalance - giftAmount;
  localStorage.setItem('walletBalance', newBalance);
  animateBalanceChange(newBalance);
  



  closeModal();
  alert(`${actionType} recorded with ${selectedRecipient} 🎉`);
  document.getElementById('gift-type').value = '';
  document.getElementById('gift-amount').value = '';




}

function loadWalletBalance() {
  let savedBalance = localStorage.getItem('walletBalance');
  if (!savedBalance) {
    savedBalance = 1000; // starting demo balance
    localStorage.setItem('walletBalance', savedBalance);
  }
  let balanceElement = document.getElementById('balance');
  if (balanceElement) {
    balanceElement.innerText = parseFloat(savedBalance).toFixed(2);
  }
}



// ====== Transaction History Load =====
const transactionBody = document.getElementById('transaction-body');
if (transactionBody) {
  window.addEventListener('DOMContentLoaded', () => {
    const transactions = getTransactions();
    transactions.forEach(t => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.date}</td>
        <td>${t.amount}</td>
        <td>${t.action}</td>
        <td>${t.code}</td>
      `;
      transactionBody.appendChild(row);
    });
  });
}

// ====== Wallet Deposit / Withdraw =====
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
    // const amount = document.getElementById('withdraw-amount').value.trim();
    // if (amount !== "") {
    //   const transactions = getTransactions();
    //   const date = new Date().toISOString().split('T')[0];
    //   const code = Math.random().toString(36).substring(2,8).toUpperCase();

    //   transactions.push({
    //     date: date,
    //     amount: `-$${amount}`,
    //     action: "Withdraw",
    //     code: code
    //   });

    //   saveTransactions(transactions);
    //   alert("Withdrawal recorded!");
    //   window.location.reload();
    // }



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
  });

  document.getElementById('submit-deposit').addEventListener('click', () => {
    // const amount = document.getElementById('deposit-amount').value.trim();
    // if (amount !== "") {
    //   const transactions = getTransactions();
    //   const date = new Date().toISOString().split('T')[0];
    //   const code = Math.random().toString(36).substring(2,8).toUpperCase();

    //   transactions.push({
    //     date: date,
    //     amount: `+$${amount}`,
    //     action: "Deposit",
    //     code: code

    let amount = parseFloat(document.getElementById('deposit-amount').value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }
    let currentBalance = parseFloat(localStorage.getItem('walletBalance'));
    let newBalance = currentBalance + amount;
    localStorage.setItem('walletBalance', newBalance);
    animateBalanceChange(newBalance);
     

      saveTransactions(transactions);
      alert("Deposit recorded!");
      window.location.reload();
    
  });

}

window.onload = () => {
  loadWalletBalance();
};