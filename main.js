
const CHAVESCORE = "score"

const txtTRABALHAR = "TRABALHE"
const txtHORADESCANSO = "Hora de descansar"

const btnINICIARPOMODORO = document.querySelector("#btnInciar");
const btnDESCANSEI = document.querySelector("#btnDescansei");
const btnTERMINEIPOMODORO = document.querySelector("#btnTerminei");

const inputTASK = document.querySelector("#inptask");
const inputTempoTrabalho = document.querySelector("#inptTempoTrabalho")
const inputTempoDescanso = document.querySelector("#inptTempoDescanso")

let pTask = document.querySelector("#task")

const spanTempoRestanteTrabalhando = document.querySelector("#tempoRestanteTrabalhando")
const spanTempoRestanteDescansando = document.querySelector("#tempoRestanteDescansando")

const divTRABALHANDO = document.querySelector("#divTrabalhando")
const divMAIN = document.querySelector("#inicio")
const divDESCANSANDO = document.querySelector("#divDescansando")

const estiloDivMAIN = "flex"
const estiloDivDESCANSANDO = "block"
const estiloDivTRABALHANDO = "block"

const spanQuantidadePomodorosFeitos = document.querySelector("#numContador")

Main()
function Main()
{
	EsconderDiv(divTRABALHANDO)
	EsconderDiv(divDESCANSANDO)

	btnINICIARPOMODORO.addEventListener("click", () =>{
		let t = Number(inputTempoTrabalho.value)
		let d = Number(inputTempoDescanso.value)

		IniciarTrabalho(t,d,inputTASK.value)
	})
	spanQuantidadePomodorosFeitos.innerHTML = PegarPontos();
}
/**
 * 
 * @param {Number} tempoTrabalho 
 * @param {Number} tempoDescanso 
 * @param {String} task 
 */
function IniciarTrabalho(tempoTrabalho,tempoDescanso, task)
{
	EsconderDiv(divMAIN)
	MostrarDiv(divTRABALHANDO,estiloDivTRABALHANDO)
	let tempoRestante = tempoTrabalho
	spanTempoRestanteTrabalhando.innerHTML = tempoRestante
	let dt = setInterval( ()=>{
		if(tempoRestante === 0)
		{
			clearInterval(dt)
			IniciarDescanso(tempoDescanso)
		}		
		console.log(tempoRestante)

		spanTempoRestanteDescansando.innerHTML = tempoRestante

		tempoRestante--

	},1000*60)

	pTask.innerHTML = `trabalhando em: ${task}`;
}
/** 
 * @param {Number} tempo 
 */
function IniciarDescanso(tempo)
{

	EsconderDiv(divTRABALHANDO);
	MostrarDiv(divDESCANSANDO,estiloDivDESCANSANDO);

	let tempoRestante = tempo;

	spanTempoRestanteTrabalhando.innerHTML = tempoRestante;

	let dt = setInterval( ()=>{
		if(tempoRestante === 0)
		{
			clearInterval(dt);
			MarcarPonto();
			MostrarDiv(divMAIN,estiloDivMAIN);
			Main();
			inputTASK.value = 0;
			inputTempoDescanso.value = 0;
			inputTempoTrabalho.value = 0;
		}		

		console.log(tempoRestante);

		spanTempoRestanteTrabalhando.innerHTML = tempoRestante;

		tempoRestante--;
	},1000*60)

	//setTimeout(Main,tempo*1000*60)
}
/**
 * 
 * @returns {Number}
 */
function PegarPontos()
{
	return window.localStorage.key.length === 0 ? 0 : Number(window.localStorage.getItem(CHAVESCORE));
}
function MarcarPonto()
{
	let score = PegarPontos();
	score++
	window.localStorage.setItem(CHAVESCORE,score)
	//dar parabens?
}
/**
 * 
 * @param {HTMLDivElement} div 
 */
function EsconderDiv(div)
{
	div.style.display = "none"
}
/**
 * 
 * @param {HTMLDivElement} div 
 * @param {String} display 
 */
function MostrarDiv(div,display)
{
	div.style.display = display
}