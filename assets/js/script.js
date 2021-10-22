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
        quantity: amountInput.value
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
}

//Set the localStorage function
function initStorage() {
    if (localStorage.getItem('storedWallet')){
        walletArray = JSON.parse(localStorage.getItem('storedWallet'));
        populateWallet(walletArray);
    }
    
}

initStorage()

function createBubbles(data) {
    const bubble = document.createElement('div');
    const innerDIV = document.createElement('div');
    const logo = document.createElement('img');
    const addText = document.createElement('p')

    bubble.classList = "content-bubble";
    innerDIV.classList = "bubble-title";
    logo.src = `./assets/img/${data.symbol}@2x.png`;
    innerDIV.appendChild(logo);
    addText.classList = 'title';
    addText.textContent = data.name;
    innerDIV.appendChild(addText);
    bubble.appendChild(innerDIV);

    innerDIV.classList = "bubble-information";
    addText.classList = 'exchange-rate';
    addText.textContent = data.price;
    innerDIV.appendChild(addText);
    addText.classList = 'moreInfoSpan';
    addText.innerHTML = '<a class="moreInfoSpan" href="#">More info</a>  ';
    innerDIV.appendChild(addText);
    bubble.appendChild(innerDIV);


    contentSection.appendChild(bubble);
}


const fakeData = {
    "symbol": "BTC",
    "show_symbol": "BTC",
    "name": "Bitcoin",
    "rank": 1,
    "price": "5524.7112165586",
    "market_cap": "94433817003.39",
    "total_volume_24h": "6378793658.5432",
    "low_24h": "5324.2665427149",
    "high_24h": "5561.0068476948",
    "delta_1h": "0.81",
    "delta_24h": "0.68",
    "delta_7d": "-15.26",
    "delta_30d": "-25.26",
    "markets": [
        {
            "symbol": "EUR",
            "volume_24h": "123707000",
            "price": "5524.7112165586",
            "exchanges": [
                {
                    "name": "Kraken",
                    "volume_24h": "50623900",
                    "price": "5520"
                },
                {
                    "name": "Bitfinex",
                    "volume_24h": "19314700",
                    "price": "5512.6"
                }
            ]
        },
    ],
    "last_updated_timestamp": 1528987416,
    "remaining": 1133
};
createBubbles(fakeData)