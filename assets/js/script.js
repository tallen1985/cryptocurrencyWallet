const walletSection = document.getElementById("wallet-section");
const walletItems = document.getElementById("wallet-items");
const walletInput = document.getElementById("wallet-input");
const amountInput = document.getElementById("amount-input");
const currencySelect = document.getElementById("currency-select");
const currencyDropDown = document.getElementById("currency-drop-down");
const submitButton = document.getElementById("submit-button");
const contentSection = document.getElementById("content-section");

const apiKeyCoin = "13694fdd04de3586";
const apiKeyGraph = "c5nm9kqad3ib3ravd1f0";

let walletArray = [];

walletInput.addEventListener("submit", function(event){
    event.preventDefault()
    const newElement = {
        coinName: currencySelect.value,
        quantity: amountInput.value
    };
    
    walletArray.push(newElement);

    walletItems.innerHTML = "";

    for (let i=0; i < walletArray.length; i++){
        const newEl = document.createElement('li');
        newEl.textContent = walletArray[i].quantity + " - " + walletArray[i].coinName;
        walletItems.appendChild(newEl);
        }
    
    amountInput.value = "";
    currencySelect.value = "";


});


//Idea for setting up wallet object
// const wallet = [
//     {
//         coinName: 'Bitcoin',
//         quantity: '3',
//         priceWhenAdded: '45032',
//         dateAdded: //use momentJS to add unix date code
//     },
//     {
//         coinName: 'DogeCoin',
//         quantity: '64',
//         priceWhenAdded: '.32',
//         dateAdded: //use momentJS to add unix date code
//     }
// ]

//we could have a text box that allows for entering purchase price
//or a checkbox to pull the current price from the api upon adding.