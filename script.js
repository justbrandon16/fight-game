let nextButton = document.getElementById('next-button');
nextButton.hidden = true;

let player = {
	health: 1000,
	power: 10000,
	base: 100,
	critc: 0.1,
	critm: 1.5,
	gold: 500

}
document.getElementById("hud-player-health").innerHTML = player.health;
document.getElementById("hud-player-base").innerHTML = player.base;
document.getElementById("hud-player-power").innerHTML = player.power;
document.getElementById("hud-player-total").innerHTML = player.base+player.power;
document.getElementById("hud-player-critc").innerHTML = player.critc;
document.getElementById("hud-player-critm").innerHTML = player.critm;
document.getElementById("hud-player-gold").innerHTML = player.gold;




var mobname = [
	'Agrith-Naar - Level 100 Greater Demon',
	'Barakiel - Angel of Lightning',
	'Chthon - Demonic Elder God',
	'Demogorgon - Man with no Face',
	'Errtu - Balor of the tanarri',
	'Furfur - Great Earl of Hell',
	'Gothmog - Lord of Balrogs',
	'Hastur - The Unspeakable One',
	'Ifrit - The infernal djinn',
	'JARRAXUS - Demon Lord of the Burning Legion'
]
var hp = [1000,5000,10000,2500,5000,10000,6000,20000,50000,30000]
var atk = [10,30,50,100,150,250,450,1000,2000,10000];
var goldloot = [1000,5000,10000,15000,25000,50000,80000,130000,250000,450000]
var mobnum = 0;

let opponent = {
	health: 1000,
	power: 10,
	base: 5,
	gold: 1000
}

document.getElementById("mob-name").innerHTML = mobname[mobnum];







const attack = () => {
	let gameMessage = document.getElementById('game-message');

	let playerAttack = detAttack(player.base,player.power);
	let opponentAttack = detAttack(opponent.base,opponent.power);
	
	// Check for critical hits
	// if (math.Random()<player.critc) {
	// 	playerAttack===detAttack;
	// } else {playerAttack===detAttack*critm}

	opponent.health -= playerAttack


	if (opponent.health<0) {
		opponent.health=0;
	} else {	player.health -= opponentAttack;
	}
	if (player.health<0) {
		player.health=0
		mobnum -=1;
	}

	var gametxt=('-'+playerAttack+' HP\n\n-'+opponentAttack+' HP');
	gameMessage.innerText = gametxt;
	printToScreen();
	document.getElementById('attack-button').disabled=true;
	setTimeout(() => {
	document.getElementById('attack-button').disabled=false;
	}, 500)

	if (isGameOver(opponent.health)){
		endFight('You have slain your opponenet!');
		return;
	}
	if (isGameOver(player.health)){
		endFight('You have been slain!');
		return;
	}

	attackButton.disabled = true;
	setTimeout(() => {
	attackButton.disabled = false;
	}, 500)
}

const endFight = (message) => {
	document.getElementById('game-message').innerText = message;
	document.getElementById('attack-button').disabled=true;

	setTimeout(() => {
	document.getElementById('attack-button').hidden=true;
	document.getElementById('next-button').hidden=false;
	document.getElementById('next-button').disabled=false;
	}, 500)
}

const next = () => {
	let attackButton=document.getElementById('attack-button');
	nextButton.disabled=true;
	setTimeout(() => {
	document.getElementById('game-message').innerText='';
	// player.health=10000;

	//post-fight rewards
	player.gold += Math.floor((((3+Math.random())/4)*goldloot[mobnum]));
	// player.gold += goldloot[mobnum];


	mobnum += 1;

	opponent.health=hp[mobnum];
	opponent.power=atk[mobnum];

	document.getElementById("mob-name").innerHTML = mobname[mobnum];
	document.getElementById("hud-player-gold").innerHTML = player.gold;
	printToScreen();
	nextButton.hidden =true;
	attackButton.disabled=false;
	attackButton.hidden =false;
	}, 500)
}

const detAttack = (base,power) => {
	return Math.floor(base+(power*(3+Math.random())/4));
}

const isGameOver = (health) => {
	return health <= 0;
}

const printToScreen = () => {
	document.getElementById('player-health').innerText = player.health+' HP';
	document.getElementById('opponent-health').innerText = opponent.health+' HP';

}

const moveUp = () => {
	mobnum += 1;
	opponent.health=hp[mobnum];
	opponent.power=atk[mobnum];
	document.getElementById("mob-name").innerHTML = mobname[mobnum];
	printToScreen();

}
const moveDown = () => {
	if (mobnum >0) {
	mobnum -= 1;
	opponent.health=hp[mobnum];
	opponent.power=atk[mobnum];
	document.getElementById("mob-name").innerHTML = mobname[mobnum];
	printToScreen();

	}
}

printToScreen();