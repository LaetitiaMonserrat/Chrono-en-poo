/*Var*/
let compteurChrono = 0;


/*Classes*/
class Chrono{
	constructor(x,y,c,b){
		this.abcisses = x;
		this.ordonnes = y;
		this.couleurBg = c;
		this.couleurBordure = b;
	}
}


/*Fonctions*/
Chrono.prototype.affiche = function(){
	compteurChrono++;
	let newDiv = document.createElement('div');
	let newInput = document.createElement('input');

	let body = document.getElementsByTagName('body')[0];

	let chrono = body.appendChild(newDiv);

	/*Style css du chrono*/
	chrono.setAttribute('id', compteurChrono );
	chrono.style.backgroundColor = this.couleurBg;
	chrono.style.height = "130px";
	chrono.style.width = "230px";
	chrono.style.left = this.abcisses;
	chrono.style.top = this.ordonnes;
	chrono.style.position = "absolute";
	chrono.style.position = "absolute";
	chrono.style.border = "3px solid "+this.couleurBordure;


	let afficheur = chrono.appendChild(newInput);
	afficheur.setAttribute('type', 'text');
	afficheur.setAttribute('value', '00 - 00 - 00');
	afficheur.style.width = "50%";
	afficheur.style.display = "block";
	afficheur.style.margin = "2rem auto 0 auto";
	afficheur.style.border = "0";


	let btnPauseStart = chrono.appendChild(document.createElement('div'));
	btnPauseStart.style.background = "url(img/play-button.png) no-repeat";
	btnPauseStart.style.backgroundSize = "contain";
	btnPauseStart.style.cursor = "pointer";
	btnPauseStart.style.height = "30px";
	btnPauseStart.style.width = "30px";

	let btnStop = chrono.appendChild(document.createElement('div'));
	btnStop.style.background = "url(img/stop.png) no-repeat";
	btnStop.style.backgroundSize = "contain";
	btnStop.style.cursor = "pointer";
	btnStop.style.height = "30px";
	btnStop.style.width = "30px";

	console.log(compteurChrono);
}


/*Code principal*/
document.addEventListener('DOMContentLoaded', function(){
	let a1 = new Chrono('120px', '200px', 'orange', 'black');
	a1.affiche();
});