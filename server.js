//Require Express.js
const express = require('express')
const app = express()

// Import the coinFlip function from your coin.mjs file

const args = require('minimist')(process.argv.slice(2))
console.log(args)
args['port']
const HTTP_PORT  = args.port || process.env.PORT || 3000

const server = app.listen(HTTP_PORT, () => {
	console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});


app.get('/app/', (req, res) => {
	// Respond with status 200
	console.log('fxn');
	res.statusCode = 200;
	// Respond with status message "OK"
	res.statusMessage = 'OK';
	res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
	res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
	const flipSide = coinFlip();
	console.log(flipSide);
	res.statusCode = 200;
	res.statusMessage = '{"flip":"' + flipSide + '"}';
	res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
	res.end(res.statusMessage);
});

app.get('/app/flips/:number', (req, res) => {
	var allFlips = coinFlips(req.params.number);
	var count = countFlips(allFlips);
	var dict = {
		"raw" : allFlips,
		"summary" : count
	};
	console.log(allFlips);
	res.statusCode = 200;
	res.statusMessage = JSON.stringify(dict); 
	res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
	res.end(res.statusMessage);
});


app.use(function(req,res){
	res.status(404).send('404 NOT FOUND')
});
/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
	let c = Math.random();
	if (c <= 0.5)
	   return "heads";
	else
       return "tails";
}

/** Multiple coin flips
 * 
 * Write a function that accepts one parameter (number of flips) and returns an array of 
 * resulting "heads" or "tails".
 * 
 * @param {number} flips 
 * @returns {string[]} results
 * 
 * example: coinFlips(10)
 * returns:
 *  [
      'heads', 'heads',
      'heads', 'tails',
      'heads', 'tails',
      'tails', 'heads',
      'tails', 'heads'
    ]
 */

function coinFlips(flips) {
	const sides = [];
	for (let i = 0; i < flips; i++){
		sides.push(coinFlip());
	}
	return sides;
}

/** Count multiple flips
 * 
 * Write a function that accepts an array consisting of "heads" or "tails" 
 * (e.g. the results of your `coinFlips()` function) and counts each, returning 
 * an object containing the number of each.
 * 
 * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
 * { tails: 5, heads: 5 }
 * 
 * @param {string[]} array 
 * @returns {{ heads: number, tails: number }}
 */

function countFlips(array) {
	let h = 0;
	let t = 0;
	array.forEach((x)=> {
		if (x.valueOf() == "heads")
			h += 1;
		else if (x.valueOf() == "tails")
			t += 1;
	});
	var flipcount = {};
	flipcount["heads"] = h;
	flipcount["tails"] = t;
	return flipcount;
}

/** Flip a coin!
 * 
 * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
 * 
 * @param {string} call 
 * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
 * 
 * example: flipACoin('tails')
 * returns: { call: 'tails', flip: 'heads', result: 'lose' }
 */

function flipACoin(call) {
	let side = coinFlip();
	var result = {};
	result["call"] = call;
	result["flip"] = side;
	if (side.valueOf() == call)
		result["result"] = "win";
	else
		result["result"] = "lose";

	return result;
}
