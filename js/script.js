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
class ChronoBis extends Chrono{
	constructor(x,y,c,b){
		super()
	}
}

/*Fonctions*/
Chrono.prototype.lecture = function(id){

	let divChrono = document.getElementById(id);
	let afficheur = divChrono.childNodes[0];
	let btnPauseStart = divChrono.childNodes[1].childNodes[0];

	btnPauseStart.classList.add('lecture');
	btnPauseStart.style.backgroundImage = "url(img/pause.png)";;	

	let tabValue = afficheur.value.split(' - ');
	let h = tabValue[0];
	let m = tabValue[1];
	let s = tabValue[2];

	timer = setInterval(() => {
		s++;
		if (s==60) {
			s = 0;
			m++;

			if (m==60) {
				m=0;
				h++;
				if (h==24) {h=0;}
			}
			if (s<10) {
				s= "0"+s;
			}
		}
		afficheur.value = h+" - "+m+" - "+s;
	}, 10);
}

Chrono.prototype.pause = function(id){
	let divChrono = document.getElementById(id);
	let btnPauseStart = divChrono.childNodes[1].childNodes[0];

	clearInterval(timer);
	btnPauseStart.classList.remove('lecture');	
	btnPauseStart.style.backgroundImage = "url(img/play-button.png)";	
}


Chrono.prototype.init = function(id){
	if (timer){clearInterval(timer);};
	let divChrono = document.getElementById(id);
	let afficheur = divChrono.childNodes[0];
	let btnPauseStart = divChrono.childNodes[1].childNodes[0];
	btnPauseStart.classList.remove('lecture');	
	btnPauseStart.style.backgroundImage = "url(img/play-button.png)";	
	afficheur.value = '00 - 00 - 00';
}

Chrono.prototype.affiche = function(){
	compteurChrono++;
	let newDiv = document.createElement('div');
	let newInput = document.createElement('input');
	let idC = "Chrono"+compteurChrono;

	let body = document.getElementsByTagName('body')[0];

	let chrono = body.appendChild(newDiv);
	/*Style css du chrono*/
	chrono.setAttribute('id', idC);
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
	afficheur.setAttribute('name', 'afficheur');
	afficheur.setAttribute('value', '00 - 00 - 00');
	afficheur.style.width = "50%";
	afficheur.style.textAlign = "center";
	afficheur.style.display = "block";
	afficheur.style.margin = "2rem auto 0 auto";
	afficheur.style.border = "0";


	let divFlex = chrono.appendChild(document.createElement('div'));
	divFlex.style.display = "flex";
	divFlex.style.margin = "25px auto 0 auto";
	divFlex.style.justifyContent = "space-around";
	divFlex.style.width = "70%";


	let btnPauseStart = divFlex.appendChild(document.createElement('div'));
	btnPauseStart.setAttribute('name', 'btnPauseStart');
	btnPauseStart.addEventListener("click", ()=>{btnPauseStart.classList.contains('lecture')? this.pause(idC): this.lecture(idC)});
	btnPauseStart.style.background = "url(img/play-button.png) no-repeat";
	btnPauseStart.style.backgroundSize = "contain";
	btnPauseStart.style.cursor = "pointer";
	btnPauseStart.style.height = "30px";
	btnPauseStart.style.width = "30px";


	let btnStop = divFlex.appendChild(document.createElement('div'));
	btnStop.addEventListener("click", ()=>{this.init(idC)});
	btnStop.style.background = "url(img/stop.png) no-repeat";
	btnStop.style.backgroundSize = "contain";
	btnStop.style.cursor = "pointer";
	btnStop.style.height = "30px";
	btnStop.style.width = "30px";
}



/*Code principal*/
document.addEventListener('DOMContentLoaded', function(){
	let a1 = new Chrono('120px', '200px', 'orange', 'black');
	a1.affiche();
	let a2 = new Chrono('10px', '60px', 'cyan', 'brown');
	a2.affiche();
});