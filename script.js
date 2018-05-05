let nextButton = document.getElementById('next-button');
nextButton.hidden = true;
let attackButton = document.getElementById('attack-button');
let upButton = document.getElementById('up-button');
let downButton = document.getElementById('down-button');
let shopButton = document.getElementById('shop-button');
let towerButton = document.getElementById('tower-button');
let shp = document.getElementById("shop");
let b1 = document.getElementById("button-1");let b2 = document.getElementById("button-2");let b3 = document.getElementById("button-3");let b4 = document.getElementById("button-4");
b1.hidden=true;b2.hidden=true;b3.hidden=true;b4.hidden=true;shp.hidden = true;


var ctx=shp.getContext("2d");

ctx.fillStyle="red"; ctx.fillRect(60,20,50,100);
ctx.fillStyle='blue'; ctx.fillRect(200,20,50,100);
ctx.fillStyle='green'; ctx.fillRect(340,20,50,100);
ctx.fillStyle='white'; ctx.fillRect(480,20,50,100);

var item = [
	'LIGHTWEIGHT RUNIC CLOTH',
	'PRAETOR EXOSKELETON',
	'CHALLENGER ARMOR',
	'PURIFIER SUIT'
]

var itemstat = [
	'+100 HP, +0 armor',
	'+150 HP, +10 armor',
	'+0 HP, +30 armor',
	'+500 HP, +30 armor'
]

var cost = [
	'1000 gold',
	'5000 gold',
	'25000 gold',
	'100000 gold'
]

const draw = (i) => {
	document.getElementById('shopdat1').innerText=item[i];
	document.getElementById('shopdat3').innerText=cost[i];
	document.getElementById('shopdat2').innerText=itemstat[i];
}


let player = {
	health: 1000,
	power: 100000,
	base: 100,
	critc: 0.1,
	critm: 1.5,
	gold: 500,
	maxfloor: 0

}
document.getElementById("hud-player-health").innerHTML = player.health;
document.getElementById("hud-player-base").innerHTML = player.base;
document.getElementById("hud-player-power").innerHTML = player.power;
document.getElementById("hud-player-total").innerHTML = player.base+player.power;
document.getElementById("hud-player-critc").innerHTML = player.critc;
document.getElementById("hud-player-critm").innerHTML = player.critm;
document.getElementById("hud-player-gold").innerHTML = player.gold;




var mobname = [
	'F1 - Agrith-Naar - Level 100 Greater Demon',
	'F2 - Barakiel - Angel of Lightning',
	'F3 - Chthon - Demonic Elder God',
	'F4 - Demogorgon - Man with no Face',
	'F5 - Errtu - Balor of the tanarri',
	'F6 - Furfur - Great Earl of Hell',
	'F7 - Gothmog - Lord of Balrogs',
	'F8 - Hastur - The Unspeakable One',
	'F9 - Ifrit - The infernal djinn',
	'Tower top - JARRAXUS - Demon Lord of the Burning Legion'
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
	attackButton.disabled=true;
	setTimeout(() => {
	attackButton.disabled=false;
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
	attackButton.disabled=true;

	setTimeout(() => {
	attackButton.hidden=true;
	nextButton.hidden=false;
	nextButton.disabled=false;
	disablevmove();
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
	player.maxfloor += 1;
	mobnum += 1;
	opponent.health=hp[mobnum];
	opponent.power=atk[mobnum];

	document.getElementById("mob-name").innerHTML = mobname[mobnum];
	document.getElementById("hud-player-gold").innerHTML = player.gold;
	printToScreen();
	nextButton.hidden =true;
	attackButton.disabled=false;
	attackButton.hidden =false;
	enablevmove();
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
	if (mobnum<player.maxfloor) {
	disablevmove();
	document.getElementById('game-message').innerText='TRAVELLING ...';
	setTimeout(() => {document.getElementById('game-message').innerText='';
	mobnum += 1;
	opponent.health=hp[mobnum];
	opponent.power=atk[mobnum];
	document.getElementById("mob-name").innerHTML = mobname[mobnum];
	printToScreen();
	enablevmove();
	}, 1000)
	} else {
	upButton.disabled=true;
	document.getElementById('game-message').innerText='YOU SHALL NOT PASS!';
	setTimeout(() => {document.getElementById('game-message').innerText=''
	upButton.disabled=false;
	}, 1000)
	}
}

	setTimeout(() => {}, 500)

const moveDown = () => {
	if (mobnum >0) {
	disablevmove();
	document.getElementById('game-message').innerText='TRAVELLING ...';
	setTimeout(() => {
	document.getElementById('game-message').innerText='';
	mobnum -= 1;
	opponent.health=hp[mobnum];
	opponent.power=atk[mobnum];
	document.getElementById("mob-name").innerHTML = mobname[mobnum];
	printToScreen();
	enablevmove();
	}, 1000)
	} else {
	downButton.disabled=true;
	document.getElementById('game-message').innerText='YOU ARE ALREADY AT THE LOWEST FLOOR';
	setTimeout(() => {document.getElementById('game-message').innerText=''
	downButton.disabled=false;
	}, 1000)
	}
}

const shop = () => {
	disablevmove();
	document.getElementById('game-message').innerText='TRAVELLING ...';
	setTimeout(() => {
	document.getElementById('game-message').hidden=true;
	document.getElementById('opponent').hidden=true;
	document.getElementById('player').hidden=true;
	shopButton.disabled=true;
	towerButton.disabled=false;
	attackButton.hidden=true;
	b1.hidden=false;
	b2.hidden=false;
	b3.hidden=false;
	b4.hidden=false;
	shp.hidden=false;
	printToScreen();
	}, 0)
}

const tower = () => {
	disablevmove();
	b1.hidden=true;b2.hidden=true;b3.hidden=true;b4.hidden=true;
	shp.hidden=true;
	document.getElementById('game-message').hidden=false;
	document.getElementById('game-message').innerText='TRAVELLING ...';
	setTimeout(() => {
	document.getElementById('game-message').innerText='';
	document.getElementById('opponent').hidden=false;
	document.getElementById('player').hidden=false;
	attackButton.hidden=false;
	printToScreen();
	enablevmove();
	shopButton.disabled=false;
	towerButton.disabled=true;

	}, 1000)
}

const enablevmove = () => {
	upButton.disabled=false;
	downButton.disabled=false;
}
const disablevmove = () => {
	upButton.disabled=true;
	downButton.disabled=true;
}






printToScreen();