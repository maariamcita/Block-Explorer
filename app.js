const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const sendButton = document.querySelector('#sendTx');
const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
let transactionList = document.querySelector('#transactions');

const rpc = new Web3('HTTP://127.0.0.1:7545');

let signer;
let account;

function initApp() {
  console.log(rpc);  
}

async function checkBalance(){
  account = accountInput.value;

  const balance = await rpc.eth.getBalance(account);
  displayBalance.innerHTML = rpc.utils.fromWei(balance, 'ether');

const block = await rpc.eth.getBlock('earliest');
const transactions = block.transctions;


if(block !== null && transactions !== null) {
  displayHistory(transactions);
}
}

async function displayHistory(transactions) {
  for (let hash of transactions) {
    console.log('Hash', hash);

    let trx = await web3.eth.getTransaction(hash);
    console.log('from: ' + trx.from + ' to: ' + trx.to + ' value: ' + trx.value);
    createTransactionList(trx);
  }
}

function createTransactionList(transaction) {
  transactionList.innerHTML = '';
  transactionList.innerHTML += `  
    <span>${transaction.from}</span>
    <span>${transaction.to}</span>
    <span>${web3.utils.fromWei(transaction.value, 'ether')} ETH</span>`;
}

async function sendTransaction() {
  const toAddress = toAccountInput.value;
  const amount = valueInput.value;

  try {
    const trx = await rpc.eth.sendTransaction({
      from: account,
      to: toAddress,
      value: rpc.utils.toWei(amount, 'ether'),
    });
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendTransaction);

