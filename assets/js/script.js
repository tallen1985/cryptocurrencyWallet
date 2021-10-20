//Idea for setting up wallet object
const wallet = [
    {
        coinName: 'Bitcoin',
        quantity: '3',
        priceWhenAdded: '45032',
        dateAdded: //use momentJS to add unix date code
    },
    {
        coinName: 'DogeCoin',
        quantity: '64',
        priceWhenAdded: '.32',
        dateAdded: //use momentJS to add unix date code
    }
]

//we could have a text box that allows for entering purchase price
//or a checkbox to pull the current price from the api upon adding.