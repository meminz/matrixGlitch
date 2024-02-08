function getQ(){
	q1 = parseFloat(document.getElementById("quota1").value);
	q2 = parseFloat(document.getElementById("quota2").value);
	q3 = parseFloat(document.getElementById("quota3").value);

	return [q1,q2,q3];
}

function bets2way(q1,q2){
	bet1 = 1 / (1+q1/q2)
	bet2 = 1-bet1

	bet2bias1 = 1 / q2
	bet1bias1 = 1 - bet2bias1

	bet1bias2 = 1 / q1
	bet2bias2 = 1 - bet1bias2

	return [bet1,bet2, bet1bias1, bet2bias1, bet1bias2, bet2bias2]
}

function bets3way(q1,q2,q3){
	let bet1 = 1 / (1+q1/q2+q1/q3)
	let bet2 = 1 / (1+q2/q1+q2/q3)
	let bet3 = 1 / (1+q3/q1+q3/q2)



	return [bet1,bet2,bet3, bets3wayBiased(q1,q2,q3)]
}

function bets3wayBiased(q1,q2,q3){
	// TODO

}



function print2Bets(bets, quotes, sommaTot){
	var output = document.getElementById("output");
	output.innerHTML = "<p>Unbiased <br>"+
	"Bet 1 = " + bets[0].toFixed(2) + "&emsp; Win = " + (bets[0]*quotes[0]-sommaTot).toFixed(2) + 
	"<br>Bet 2 = " + bets[1].toFixed(2) + "&emsp; Win = " +(bets[1]*quotes[1]-sommaTot).toFixed(2) +
	"<br><br>" +

	"Biased (1 vincente)<br>"+
	"Bet 1 = " + bets[2].toFixed(2) + "&emsp; Win = " + (bets[2]*quotes[0]-sommaTot).toFixed(2) +
	"<br>Bet 2 = " + bets[3].toFixed(2) + "&emsp; Win = " +(bets[3]*quotes[1]-sommaTot).toFixed(2) +
	"<br><br>" +

	"Biased (2 vincente)<br>Bet 1 = " + bets[4].toFixed(2) + "&emsp; Win = " + (bets[4]*quotes[0]-sommaTot).toFixed(2) +
	"<br>Bet 2 = " + bets[5].toFixed(2) + "&emsp; Win = " + (bets[5]*quotes[1]-sommaTot).toFixed(2) +
	"<br><br></p>"

}

//TODO win 3
function print3Bets(bets, quotes, sommaTot){
	var output = document.getElementById("output");
	output.innerHTML = "<p>Bet 1 = " + bets[0].toFixed(2) + "<br>Bet 2 = " + bets[1].toFixed(2) + "<br>Bet 3 = " + bets[2].toFixed(2) +
	"<br>Win1 = " + (bets[0]*quotes[0] - sommaTot).toFixed(2) + "<br>Win2 = " +(bets[1]*quotes[1] - sommaTot).toFixed(2) + "<br>Win3 = " +(bets[2]*quotes[2] - sommaTot).toFixed(2) +
	"<br><br>" //+

	// "Biased (1 vincente)<br>"+
	// "Bet 1 = " + biased[0].toFixed(2) + "<br>Bet2 = " + biased[1].toFixed(2) + 
	// "<br>Win 1 = " + (biased[0]*quotes[0] - sommaTot).toFixed(2) + "<br>Win2 = " +(biased[1]*quotes[1] - sommaTot).toFixed(2) +
	// "<br><br>" +

	// "Biased (X vincente)<br>"+
	// "Bet 1 = " + biased[2].toFixed(2) + "<br>Bet2 = " + biased[3].toFixed(2) + 
	// "<br>Win 1 = " + (biased[2]*quotes[0] - sommaTot).toFixed(2) + "<br>Win2 = " +(biased[3]*quotes[1] - sommaTot).toFixed(2) +
	// "<br><br>" +

	// "Biased (2 vincente)<br>Bet 1 = " + biased[4].toFixed(2) + "<br>Bet2 = " + biased[5].toFixed(2) + 
	// "<br>Win 1 = " + (biased[4]*quotes[0] - sommaTot).toFixed(2) + "<br>Win2 = " + (biased[5]*quotes[1] - sommaTot).toFixed(2) +
	// "<br><br></p>" 

}




function calculator(){
	let quotes = getQ();
	let sommaTot = parseFloat(document.getElementById("sommaTot").value);	

	if(isNaN(quotes[2])){

		const bets = bets2way(quotes[0],quotes[1])

		// arrottondamento per eccesso della bet sulla quota minore
		if(quotes[0]<quotes[1]){
			bets[0] = Math.ceil(bets[0]*sommaTot)
			bets[1] = Math.floor(bets[1]*sommaTot)
		} else {
			bets[0] = Math.floor(bets[0]*sommaTot)
			bets[1] = Math.ceil(bets[1]*sommaTot)
		}

		// arrottondamento per eccesso della bet sulla quota a guadagno 0
		bets[2] = Math.floor(bets[2]*sommaTot)
		bets[3] = Math.ceil(bets[3]*sommaTot)

		bets[4] = Math.ceil(bets[4]*sommaTot)
		bets[5] = Math.floor(bets[5]*sommaTot)


		print2Bets(bets, quotes, sommaTot) 

	} else {
		
		const calc = bets3way(q1,q2,q3)
		let biased = calc[3]
		let bets = calc.slice(0, 3)
		console.log(bets)

		// TODO arrotondamento bet

		for(var i = 0, length1 = bets.length; i < length1; i++){
			bets[i] *= sommaTot
		}

		print3Bets(bets, quotes, sommaTot)


	}

}

