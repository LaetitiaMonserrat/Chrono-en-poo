/*Var*/
let compteurChrono = 0;
let body = document.getElementsByTagName('body')[0];

/*Classes*/
class Chrono{
	constructor(abcisses,ordonnes,couleurBg,couleurBordure){
		this.abcisses = abcisses;
		this.ordonnes = ordonnes;
		this.couleurBg = couleurBg;
		this.couleurBordure = couleurBordure;

		this.divChrono = document.createElement('div');
		this.afficheur = document.createElement('input');
		this.divFlex = document.createElement('div');
		this.btnPauseStart = document.createElement('div');
		this.btnStop = document.createElement('div');
	}
}


class ChronoBis extends Chrono{
	constructor(abcisses,ordonnes,couleurBg,couleurBordure){
		super(abcisses, ordonnes, couleurBg, couleurBordure);
		this.btnCross = document.createElement('div');
	}
	affiche(){
		super.affiche();
		this.divChrono.appendChild(this.btnCross);
		this.btnCross.setAttribute('name', 'btnCross');
		this.btnCross.style.background = "url(img/delete.png) no-repeat";
		this.btnCross.style.backgroundSize = "contain";
		this.btnCross.style.cursor = "pointer";
		this.btnCross.style.height = "25px";
		this.btnCross.style.width = "25px";
		this.btnCross.style.position = "absolute";
		this.btnCross.style.top = "4px";
		this.btnCross.style.right = "4px";
		this.btnCross.addEventListener("click", ()=>{this.divChrono.parentNode.removeChild(this.divChrono);});
	}
}

class ChronoTer extends ChronoBis{
	constructor(abcisses,ordonnes,couleurBg,couleurBordure){
		super(abcisses, ordonnes, couleurBg, couleurBordure);
	}
	affiche(){
		super.affiche();
		this.divChrono.style.cursor = "grab";

		this.divChrono.addEventListener('mousedown', (e)=>{
			let dx = e.clientX - parseInt(this.divChrono.style.left);
			let dy = e.clientY - parseInt(this.divChrono.style.top);

			this.divChrono.style.cursor = "grabbing";
			this.divChrono.style.zIndex = compteurChrono;
			compteurChrono++;
			let onDrop;

			document.addEventListener('mousemove', onDrop = (e)=>{
				this.divChrono.style.left = (e.clientX - dx)+"px";
				this.divChrono.style.top = (e.clientY - dy)+"px";});
			document.addEventListener('mouseup', (e)=>{
				this.divChrono.style.cursor = "grab";
				document.removeEventListener('mousemove', onDrop);
			});
		});
	}
}


/*Fonctions Classes*/
Chrono.prototype.lecture = function(){

	this.btnPauseStart.classList.add('lecture');
	this.btnPauseStart.style.backgroundImage = "url(img/pause.png)";

	let tabValue = this.afficheur.value.split(' - ');
	let h = tabValue[0];
	let m = tabValue[1];
	let s = tabValue[2];

	this.timer = setInterval(() => {
		s++;
		if (s==60) {
			s = 0;
			m++;
			if (m==60) {
				m=0;
				h++;
				if (h==24) {h=0;}
				if (h<10) {h = "0"+h;}
			}
			if (m<10) {m = "0"+m;}
		}
		if (s<10) {s = "0"+s;}
		this.afficheur.value = h+" - "+m+" - "+s;
	}, 1000);
}

Chrono.prototype.pause = function(){
	clearInterval(this.timer);
	this.btnPauseStart.classList.remove('lecture');	
	this.btnPauseStart.style.backgroundImage = "url(img/play-button.png)";	
}

Chrono.prototype.init = function(){
	clearInterval(this.timer);
	this.btnPauseStart.classList.remove('lecture');	
	this.btnPauseStart.style.backgroundImage = "url(img/play-button.png)";	
	this.afficheur.value = '00 - 00 - 00';
}

Chrono.prototype.affiche = function(){
	compteurChrono++;
 
 	/*On construit tous les éléments du Chrono*/
 	body.appendChild(this.divChrono);
	this.divChrono.appendChild(this.afficheur);
	this.divChrono.appendChild(this.divFlex);
	this.divFlex.appendChild(this.btnPauseStart);
	this.divFlex.appendChild(this.btnStop);


	/*Style css du chrono*/
	this.divChrono.style.backgroundColor = this.couleurBg;
	this.divChrono.style.height = "100px";
	this.divChrono.style.width = "190px";
	this.divChrono.style.left = this.abcisses;
	this.divChrono.style.top = this.ordonnes;
	this.divChrono.style.position = "absolute";
	this.divChrono.style.border = "3px solid "+this.couleurBordure;


	this.afficheur.setAttribute('type', 'text');
	this.afficheur.setAttribute('value', '00 - 00 - 00');
	this.afficheur.style.width = "50%";
	this.afficheur.style.textAlign = "center";
	this.afficheur.style.display = "block";
	this.afficheur.style.margin = "1rem auto 0 auto";
	this.afficheur.style.border = "0";


	this.divFlex.style.display = "flex";
	this.divFlex.style.margin = "25px auto 0 auto";
	this.divFlex.style.justifyContent = "space-around";
	this.divFlex.style.width = "70%";


	this.btnPauseStart.setAttribute('name', 'btnPauseStart');
	this.btnPauseStart.addEventListener("click", ()=>{this.btnPauseStart.classList.contains('lecture')? this.pause(): this.lecture()});
	this.btnPauseStart.style.background = "url(img/play-button.png) no-repeat";
	this.btnPauseStart.style.backgroundSize = "contain";
	this.btnPauseStart.style.cursor = "pointer";
	this.btnPauseStart.style.height = "30px";
	this.btnPauseStart.style.width = "30px";


	this.btnStop.addEventListener("click", ()=>{this.init()});
	this.btnStop.style.background = "url(img/stop.png) no-repeat";
	this.btnStop.style.backgroundSize = "contain";
	this.btnStop.style.cursor = "pointer";
	this.btnStop.style.height = "30px";
	this.btnStop.style.width = "30px";
}

Node.prototype.drag = function(object){
	this.addEventListener('mousedown', (e)=>{
		let dx = e.clientX - parseInt(this.style.left);
		let dy = e.clientY - parseInt(this.style.top);

		this.style.cursor = "grabbing";

		let onDrop;
		document.addEventListener('mousemove', onDrop = (e)=>{
			this.style.left = (e.clientX - dx)+"px";
			this.style.top = (e.clientY - dy)+"px";});
		document.addEventListener('mouseup', (e)=>{
			this.style.zIndex = 0;
			this.style.cursor = "grab";
			document.removeEventListener('mousemove', onDrop);
		});
	});
}

/*Code principal*/
document.addEventListener('DOMContentLoaded', function(){
	let a5 = new ChronoTer('220px', '10px', 'lightsteelblue', 'darkcyan');
	a5.affiche();
	let a1 = new Chrono('120px', '200px', 'orange', 'black');
	a1.affiche();
	let a2 = new Chrono('10px', '60px', 'cyan', 'brown');
	a2.affiche();
	let a3 = new ChronoBis('450px', '60px', 'purple', 'lightgray');
	a3.affiche();
	let a4 = new ChronoTer('380px', '210px', 'lightgray', 'pink');
	a4.affiche();

});