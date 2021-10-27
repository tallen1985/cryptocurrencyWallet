//Set Global variables
const walletSection = document.getElementById("wallet-section");
const walletItems = document.getElementById("wallet-items");
const walletInput = document.getElementById("wallet-input");
const amountInput = document.getElementById("amount-input");
const currencySelect = document.getElementById("currency-select");
const currencyDropDown = document.getElementById("currency-drop-down");
const submitButton = document.getElementById("submit-button");
const contentSection = document.getElementById("content-section");
const audioEl = document.querySelector("#audio");
const today = moment().format('X');
const sevenDaysAgo = moment().subtract('7', 'days').format('X');
const sliderEl = document.querySelector("#switch");
const apiKeyCoin = "13694fdd04de3586";
const apiKeyGraph = "c5nm9kqad3ib3ravd1f0";


let walletArray = [];

//Set Event Listener for Submit button
walletInput.addEventListener("submit", function(event){
    event.preventDefault()
        audioEl.play();
    const newElement = {
        coinName: currencySelect[currencySelect.selectedIndex].text,
        quantity: amountInput.value,
        coinSymbol: currencySelect[currencySelect.selectedIndex].value
    };
    
    walletArray.push(newElement);
    populateWallet();
    
    
    amountInput.value = "";
    currencySelect.value = "";
});

//Populate wallet function
function populateWallet(){
    walletItems.innerHTML = "";

    for (let i=0; i < walletArray.length; i++){
        const newEl = document.createElement('li');
        newEl.textContent = walletArray[i].quantity + " - " + walletArray[i].coinName;
        const deleteBtn = document.createElement('button');
        deleteBtn.classList = 'delete';
        deleteBtn.value=i;
        deleteBtn.onclick = deleteWalletItem;
        newEl.appendChild(deleteBtn);
        walletItems.appendChild(newEl);
    }
    
    localStorage.setItem("storedWallet", JSON.stringify(walletArray));

    getBubbles(walletArray);
}

function deleteWalletItem(){
    walletItems.addEventListener('click', function(event){
        const clickedItem = event.target;
        if(clickedItem.classList.contains('delete')){
            const index = clickedItem.value
            walletArray.splice(index, 1);
            populateWallet(walletArray);
        }
    })
}

//Set the localStorage function
function initStorage() {
    if (localStorage.getItem('storedWallet')){
        walletArray = JSON.parse(localStorage.getItem('storedWallet'));
        populateWallet(walletArray);
    }
    
}

initStorage()

// sliderEl.addEventListener("click", function() {
//     if (input === checked) {
//         default;lasdjkf
//     } else {
//         return;
//     }
    
// })

function createBubble(data, quantity) {
    const bubble = document.createElement('div');
    const titleDIV = document.createElement('div');
    const infoDIV = document.createElement('div');
    const logo = document.createElement('img');
    const titleP = document.createElement('p');
    const exchangeRate = document.createElement('p')
    const moreInfoLink = document.createElement('p')
    const chart = document.createElement('div')
    const totalAmount = document.createElement('p');

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


    totalAmount.classList = 'exchangeRate';
    totalAmount.textContent = `Total Value: $${Number(data.price * quantity).toFixed(2)} USD`;
    infoDIV.appendChild(totalAmount);

    chart.id = `${data.symbol}Chart`;
    chart.classList = 'stockChart'
    chart.innerHTML = `<canvas id="${data.symbol}Canvas" width="300px" height="200px"></canvas>`
    getStockData(data.symbol, data.symbol + 'Canvas')
    bubble.append(chart);
    
    moreInfoLink.innerHTML = `<p class="moreInfoSpan has-tooltip-multiline" id='${data.name}Info'>More info</p>`
    infoDIV.appendChild(moreInfoLink);
    toolTip(data.name);

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
                    createBubble(data, walletArray[0].quantity);
                    console.log(data.remaining);
                } else {
                    for (let i = 0; i < data.coins.length; i++) {
                        createBubble(data.coins[i], walletArray[i].quantity);
                        console.log(data.remaining);
                    }
                }
            })
    } else {
        contentSection.innerHTML = '<h1 style="color: black;">Nothing Currently in your Wallet</h1>';
    }
}

// Stock chart part!
function getStockData(symbol, chartID) {
    const url = `https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:${symbol}USDT&resolution=D&from=${sevenDaysAgo}&to=${today}&token=${apiKeyGraph}`;
    fetch(url)
            .then(function (response) {
                console.log(response);
            return response.json();
            })
            .then(function (stockData){
                console.log(stockData);
                let xLabels = stockData.t;
                for (let x = 0; x < xLabels.length; x++) {
                    xLabels[x] = moment.unix(xLabels[x]).format('M/D');
                } 
                var ctx = document.getElementById(chartID).getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: xLabels,
                            datasets: [{
                                label: 'Closing Value',
                                data: stockData.c,
                                borderWidth: 1,
                                borderColor: "black",
                                backgroundColor: "yellowgreen",
                                color: 'white'
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: false
                                }
                            }
                        }
                    })

                })
        }


sliderEl.addEventListener("click", function() {
    if (sliderEl.checked) {
        refreshTime = setInterval(function() {
            getBubbles(walletArray)},
            60000)     
    } else (clearInterval(refreshTime))
})

function toolTip(name) {
    let wikiName = '';
    switch(name) {
        case 'Bitcoin':
            wikiName = 'Bitcoin';
            break;
        case 'Ethereum':
            wikiName = 'Ethereum'
            break;
        case 'Cardano':
            wikiName = 'Cardano_(blockchain_platform)'
            break;
        case 'Litecoin':
            wikiName = 'Litecoin'
            break;
        case 'Binance Coin':
            wikiName = 'Binance#Cryptocurrencies'
            break;
        case 'XRP':
            wikiName = 'Ripple_(payment_protocol)'
            break;
        case 'Polkadot':
            wikiName = 'Polkadot_(cryptocurrency)'
            break;
        case 'USCoin':
            wikiName = 'USD_Coin'
            break;
        case 'Dogecoin':
            wikiName = 'Dogecoin'
            break;
        case 'Luna':
            wikiName = 'Cryptocurrency'
            break;
    }
        
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiName}`;
    fetch(url)
            .then(function (response) {
                console.log(response);
            return response.json();
            })
            .then(function (data){
                idTag = name + 'Info'
                const element = document.getElementById(idTag)
                element.dataset.tooltip = data.extract;
            })
        }
