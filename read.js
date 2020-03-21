const fs = require('fs');

let obj = {};
let arr, res;

const data = fs.readFileSync('./biblia.txt', 'utf-8', (err, data) => {
	if (err) throw err;
	return data;
});

arr = data.toLowerCase().replace(/([^a-zA-Z ]+)|(r\n|\n|\r)|(\W*\b\w{1,2}\b)/g, '').split(' ');
aux = arr.filter(x => x);
res = arr.reduce((all, word) => {
	(word in all) ? all[word]++ : all[word] = 1;
	return all;
}, {});

aux2 = Object.keys(res).sort((a, b) => res[b] - res[a]).map(key => obj[key] = res[key])
topTen = Object.keys(obj).slice(0,10).map(key => ({[key]:obj[key]}))

let nameArray = topTen.map(x => Object.getOwnPropertyNames(x)).flat();
let numArray = topTen.map(x => Object.values(x)).flat();

module.exports = { nameArray, numArray }