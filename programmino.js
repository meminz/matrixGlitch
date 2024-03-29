function getQ(){
	q1 = parseFloat(document.getElementById("quota1").value);
	q2 = parseFloat(document.getElementById("quota2").value);
	q3 = parseFloat(document.getElementById("quota3").value);

	return [q1,q2,q3];
}


// 1 2
function bets2way(q1,q2){
	bet1 = 1 / (1 + q1/q2)
	bet2 = 1-bet1

	bet2bias1 = 1 / q2
	bet1bias1 = 1 - bet2bias1

	bet1bias2 = 1 / q1
	bet2bias2 = 1 - bet1bias2

	return [bet1,bet2, bet1bias1, bet2bias1, bet1bias2, bet2bias2]
}



// 1 X 2
function unbiased3way(q1,q2,q3){
	let bet1 = 1 / (1+q1/q2+q1/q3)
	let bet2 = 1 / (1+q2/q1+q2/q3)
	let bet3 = 1 / (1+q3/q1+q3/q2)

	return [bet1,bet2,bet3]
}


function bets3way(L2, L3){
	let den = (1+L2+L3)
	let bet1 = 1 / den
	let bet2 = L2 / den
	let bet3 = L3 / den

	return [bet1,bet2,bet3]
}



function money2way(moneyPerc,quotes){
	// arrottondamento per eccesso della bet sulla quota minore
	bets = [0,0,0,0,0,0]

	if(quotes[0]<quotes[1]){
		bets[0] = Math.ceil(moneyPerc[0]*sommaTot)
		bets[1] = Math.floor(moneyPerc[1]*sommaTot)
	} else {
		bets[0] = Math.floor(moneyPerc[0]*sommaTot)
		bets[1] = Math.ceil(moneyPerc[1]*sommaTot)
	}

	// arrottondamento per eccesso della bet sulla quota a guadagno 0
	bets[2] = Math.floor(moneyPerc[2]*sommaTot)
	bets[3] = Math.ceil(moneyPerc[3]*sommaTot)

	bets[4] = Math.ceil(moneyPerc[4]*sommaTot)
	bets[5] = Math.floor(moneyPerc[5]*sommaTot)

	console.log(bets)
	return bets
}




function print2Bets(bets, quotes, sommaTot){
	var output = document.getElementById("output");
	output.innerHTML = "<p>Unbiased <br>"+
	"Bet 1 = " + bets[0].toFixed(2) + "&emsp; Win = " + (bets[0]*quotes[0]-sommaTot).toFixed(2) + 
	"<br>Bet 2 = " + bets[1].toFixed(2) + "&emsp; Win = " + (bets[1]*quotes[1]-sommaTot).toFixed(2) +
	"<br><br>" +

	"Biased (1 vincente)<br>"+
	"Bet 1 = " + bets[2].toFixed(2) + "&emsp; Win = " + (bets[2]*quotes[0]-sommaTot).toFixed(2) +
	"<br>Bet 2 = " + bets[3].toFixed(2) + "&emsp; Win = " + (bets[3]*quotes[1]-sommaTot).toFixed(2) +
	"<br><br>" +

	"Biased (2 vincente)<br>Bet 1 = " + bets[4].toFixed(2) + "&emsp; Win = " + (bets[4]*quotes[0]-sommaTot).toFixed(2) +
	"<br>Bet 2 = " + bets[5].toFixed(2) + "&emsp; Win = " + (bets[5]*quotes[1]-sommaTot).toFixed(2) +
	"<br><br></p>"

}

//TODO win 3
function output3Bets(bet, quotes, sommaTot){
	return "Somma da bettare: € " + sommaTot + "<br>" +
	"Bet 1 = " + bet[0].toFixed(2) + "&emsp; Win = " + (bet[0]*quotes[0] - sommaTot).toFixed(2) +
	"<br>Bet 2 = " + bet[1].toFixed(2) + "&emsp; Win = " + (bet[1]*quotes[1] - sommaTot).toFixed(2) +
	"<br>Bet 3 = " + bet[2].toFixed(2) + "&emsp; Win = " + (bet[2]*quotes[2] - sommaTot).toFixed(2) +
	"<br><br>"

}




function calculator(){
	let quotes = getQ();
	let sommaTot = parseFloat(document.getElementById("sommaTot").value);	

	if(isNaN(quotes[2])){

		let bets = bets2way(quotes[0],quotes[1])
		console.log(bets[0])
		// let moneyBets = money2way(moneyPerc, quotes)

		// arrottondamento per eccesso della bet sulla quota minore

		if(quotes[0] < quotes[1]){
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

		// for(var i = 0, length1 = bets.length; i < length1; i++){
		// 	bets[i] = bets[i] * sommaTot
		// }



		console.log(bets[0])

		print2Bets(bets, quotes, sommaTot) 

	} else {


		let tot = 0
		let outText = ""

		// unbiased
		const unbiased = unbiased3way(q1,q2,q3)

		for(var i = 0, length1 = unbiased.length; i < length1; i++){
			unbiased[i] = Math.round(unbiased[i]*sommaTot)
			tot = tot + unbiased[i]
		}

		// TODO arrotondamento bet


		// unbiased output
		outText = outText + output3Bets(unbiased, quotes, tot)
	
		q1 = quotes[0]
		q2 = quotes[1]
		q3 = quotes[2]

		Ls = [
			// 1
			["1",  q3 / (q2*q3 - q2 - q3), (1+q3 / (q2*q3 - q2 - q3)) / (q3-1)],
			// 1 X
			["1 X", q1/q2, (1+q1/q2) / (q3-1)],
			// X
			["X", q1-1- q1/q3, q1/q3],
			// X 2
			["X 2", q3 * (q1-1) / (q2+q3), q2 * (q1-1) / (q2+q3)],
			// 2
			["2", q1/q2, (q2-1) * q1/q2 - 1],
			// 1 2 
			["1 2", (1+q1/q3) / (q2-1), q1/q2]
			]


		for(var i = 0; i < 6; i++){
			tot = 0
			const bets = bets3way(Ls[i][1],Ls[i][2])

			for(var j = 0, length1 = bets.length; j < length1; j++){
				// bets[j] = Math.ceil(bets[j] * sommaTot + 0.4)
				bets[j] = bets[j] * sommaTot
				tot = tot + bets[j]
			}

			outText = outText + "Biased " + Ls[i][0] + "<br>" + output3Bets(bets, quotes, tot)
		}


		var output = document.getElementById("output");
		output.innerHTML = "<p>" + outText + "</p>"

	}

}

