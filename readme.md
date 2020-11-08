# Casino.js
> A Web API for play dice, card games, coin flip and roulette.
Casino.js is a easy-to-use web API to handle some popular casino games and hel to implement online casino games.

# API address
> [https://casino-js.herokuapp.com/](https://casino-js.herokuapp.com/)
## Get Started

To start using Casino.js API, you have to get your token for free in our ```/register``` endpoint with your e-mail address,
Every request must to contain a header named ```token``` with your personal token.

## Games avaliable

### Coin flip

A simple coin flip game, use the HTTP method ```GET``` to ```/coin``` and use query option ```coins``` to set how many coins you want to flip (by default, it will flip one coin).

The ```response``` body will contain an ```payload``` object with the number of ```coins``` you flipped, and an ```result``` array with the results you got. The 2 possible results are: ```"heads"``` and ```"tails"```.


### Roll-a-die

A roll dice game, use the HTTP method ```GET``` to ```/dice``` and use query option ```dice``` to set how many dice you want to roll and ```faces``` to set how many faces the dice will have. (by default, it will roll one stardard 6-faced die)

The ```response``` body will contain an ```payload``` object with the number of ```dice``` you rolled, and an ```result``` array with the results you got. The result will be a numeric number correspondig of the upper face of each die.


### Roulette

A french or american roulette game, the difference between is that american roulette have 36 numbers and 2 "zeros", french roulette have just one "zero". use the HTTP method ```GET``` to ```/roullete/american``` to american roulette or ```/roullete/french``` to french roulette.

The ```response``` body will contain an ```payload``` object with the ```value``` that was rolled, and if the number is ```back``` or ```red```, ```odd``` or ```even```, in the ```firstHalf``` or ```secondHalf``` and ```firstDozen```, ```secondDozen``` or ```thirdDozen``` of the table and ```type``` of roullete choosen (```american``` or ```french```).


### 52-card deck

You can generate a 52-card deck and shuffle it. use the HTTP method ```GET``` to ```/deck/new``` to create and shuffle a new deck.
Casino.js is stateless, so, to draw cards in a deck and store the new state, it generates a key that you can use to store the current state of your deck.
the ```/deck/new``` method returns a deck hash in the ```payload``` object. to draw cards from a deck, you must to pass the ```deck``` hash in query and how many ```cards``` you want to draw (Default is one card) and use ```GET``` to the endpoint ```/deck/draw```. 

The ```response``` body will contain an ```payload``` object with the new ```deckHash``` and the cards you just drew. To draw more cards, it's mandatory you send this current deck state hash to API in your request query. 


## Contributing

1. Fork it (<https://github.com/fdias1/casino.js/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request