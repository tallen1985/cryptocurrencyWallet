//Set Global variables
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

//Set Event Listener for Submit button
walletInput.addEventListener("submit", function(event){
    event.preventDefault()
    const newElement = {
        coinName: currencySelect[currencySelect.selectedIndex].text,
        quantity: amountInput.value,
        coinSymbol: currencySelect[currencySelect.selectedIndex].value
    };
    
    walletArray.push(newElement);

    populateWallet(walletArray);

    localStorage.setItem("storedWallet", JSON.stringify(walletArray));
    
    amountInput.value = "";
    currencySelect.value = "";
});

//Populate wallet function
function populateWallet(walletArray){
    walletItems.innerHTML = "";

    for (let i=0; i < walletArray.length; i++){
        const newEl = document.createElement('li');
        newEl.textContent = walletArray[i].quantity + " - " + walletArray[i].coinName;
        walletItems.appendChild(newEl);
        
        }
    getBubbles(walletArray);
}

//Set the localStorage function
function initStorage() {
    if (localStorage.getItem('storedWallet')){
        walletArray = JSON.parse(localStorage.getItem('storedWallet'));
        populateWallet(walletArray);
    }
    
}

initStorage()

function createBubble(data) {
    const bubble = document.createElement('div');
    const titleDIV = document.createElement('div');
    const infoDIV = document.createElement('div');
    const logo = document.createElement('img');
    const titleP = document.createElement('p');
    const exchangeRate = document.createElement('p')
    const moreInfoLink = document.createElement('a')

    bubble.classList = "contentBubble";
    titleDIV.classList = "bubbleTitle";

    logo.src = `./assets/img/${data.symbol}@2x.png`;
    titleDIV.appendChild(logo);

    titleP.classList = 'title';
    titleP.textContent = data.name;
    titleDIV.appendChild(titleP);

    bubble.appendChild(titleDIV);
    
    infoDIV.classList = "bubbleInformation"
    exchangeRate.classList = 'exchangeRate';
    exchangeRate.textContent = Number(data.price).toFixed(4) + ' USD'
    infoDIV.appendChild(exchangeRate);

    moreInfoLink.innerHTML = '<a class="moreInfoSpan" href="#">More info</a>'
    infoDIV.appendChild(moreInfoLink);

    bubble.appendChild(infoDIV);

    contentSection.appendChild(bubble);
}

function getBubbles(walletArray) {
    //need to redo it so that it gets all the things at once
    let symbol = '';
    if (walletArray.length > 0) {
        let url = `https://coinlib.io/api/v1/coin?key=${apiKeyCoin}&pref=USD&symbol=`;
        for (let x = 0; x < walletArray.length; x++) {
            symbol = walletArray[x].coinSymbol;
            if (x == 0) {
                url += symbol
            } else {
                url += ',' + symbol;
            };
        }
        contentSection.innerHTML = "";
        console.log(url)
        //fetch data based on walletArray's coinSymbol key
        fetch(url)
            .then(function (response) {
                console.log(response);
            return response.json();
            })
            .then(function (data) {
                if (walletArray.length == 1) {
                    createBubble(data);
                    console.log(data.remaining);
                } else {
                    for (let i = 0; i < data.coins.length; i++) {
                        createBubble(data.coins[i]);
                        console.log(data.remaining);
                    }
                }
            })
    }
}