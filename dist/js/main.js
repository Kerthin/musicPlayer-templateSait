(function IIFE() {
	const list = [
	{
		id: 1,
		class: 'jerryHerman',
		url: "music/JerryHerman_PutOnYourSundayClothes.mp3",
		author: "Jerry Herman",
		title: "Put On Your Sunday"
	},
	{
		id: 2,
		class: 'elvisPresley',
		url: "music/ElvisPresley_CantHelpFallingInLove.mp3",
		author: "Elvis Presley",
		title: "Can't Falling In Love"
	},
	{
		id: 3,
		class: 'royOrbison',
		url: "music/RoyOrbison_OhPrettyWoman.mp3",
		author: "Roy Orbison",
		title: "Oh, Pretty Woman"
	},
	{
		id: 4,
		class: 'frankSinatra',
		url: "music/FrankSinatra_ThatsLife.mp3",
		author: "Frank Sinatra",
		title: "That's Life"
	},
	{
		id: 5,
		class: 'jimCroce',
		url: "music/JimCroce_TimeInABottle.mp3",
		author: "Jim Croce",
		title: "Time In A Bottle"
	},
	{
		id: 6,
		class: 'redHotChiliPeppers',
		url: "music/RedHotChiliPeppers_DarkNecessities.mp3",
		author: "Red Hot Chili Peppers",
		title: "Dark Necessities"
	},
	{
		id: 7,
		class: 'stephaneGrappelli',
		url: "music/StephaneGrappelli_laMer.mp3",
		author: "Stephane Grappelli",
		title: "La Mer"
	},
	{
		id: 8,
		class: 'evanKing',
		url: "music/EvanKing_Overwatch.mp3",
		author: "Evan King",
		title: "Overwatch"
	},
	{
		id: 9,
		class: 'JR',
		url: "music/JR_SouthSac.mp3",
		author: "JR",
		title: "SouthSac"
	},
	{
		id: 10,
		class: 'theDeli',
		url: "music/TheDeli_Sun.mp3",
		author: "The Deli",
		title: "Sun"
	}
];

let currentId = 0;
let isPlaying = false;
let isLoop = true;
let loopOne = false;
let isShuffle = false;
let currentAudio = "music1";
let timer = null;

const albumWrap = document.querySelector(".album");
const currentTimeIndicator = document.querySelector(".musicTime__current");
const leftTimeIndicator = document.querySelector(".musicTime__last");
const progressBar = document.getElementById("length");
const title = document.querySelector(".musicInfo__name");
const author = document.querySelector(".musicInfo__author");

const albumClass = document.getElementById("jsAlbum");
const playBtn = document.getElementById("play");
const loopBtn = document.getElementById("loop");
const shuffleBtn = document.getElementById("shuffle");
const forwardBtn = document.getElementById("forward");
const backwardBtn = document.getElementById("backward");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressDiv = document.getElementById("progress");

// BUTTON PLAY
function play(e) {
	if (!isPlaying) {
		e.target.classList.remove("_play");
		e.target.classList.add("_pause");

		albumWrap.classList.remove("_play");
		albumWrap.classList.add("_pause");

		isPlaying = true;
		document.getElementById(currentAudio).play();
		showTime();
	} else {
		e.target.classList.remove("_pause");
		e.target.classList.add("_play");

		albumWrap.classList.remove("_pause");
		albumWrap.classList.add("_play");

		isPlaying = false;
		document.getElementById(currentAudio).pause();
		clearInterval(timer);
	}
}

// TIME
function changeBar() {
	const audio = document.getElementById(currentAudio);
	const percentage = (audio.currentTime / audio.duration).toFixed(3);
	progressBar.style.transition = "";

	//set current time
	const minute = Math.floor(audio.currentTime / 60);
	const second = Math.floor(audio.currentTime % 60);
	const leftTime = audio.duration - audio.currentTime;
	currentTimeIndicator.innerHTML = ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

	//set left time
	const leftMinute = Math.floor(leftTime / 60);
	const leftSecond = Math.floor(leftTime % 60);

	leftTimeIndicator.innerHTML = ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);

	//set time bar
	progressBar.style.width = percentage * 100 + "%";
}

function showTime() {
	timer = setInterval(() => changeBar(), 500);
}

// SWITCHING MUSIC
function nextMusic(mode) {
	playBtn.classList.remove("_pause");
	playBtn.classList.add("_play");

	albumWrap.classList.remove("_pause");
	albumWrap.classList.add("_play");

	document.getElementById(currentAudio).pause();
	isPlaying = false;
	clearInterval(timer);

	if (mode === "next") {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
		init();
	} else {
		currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
		init();
	}
}

// STARTING A RANDOM TRACK
function shuffle(e) {
	isShuffle = !isShuffle;
	if (isShuffle) {
		e.target.classList.add("_shuffle");
	} else {
		e.target.classList.remove("_shuffle");
	}
}

// 5 SECONDS AGO
function backward() {
	const audio = document.getElementById(currentAudio);
	audio.currentTime -= 5;
	if (!isPlaying) {
		changeBar();
	}
}

// 5 SECONDS AHEAD
function forward() {
	const audio = document.getElementById(currentAudio);
	audio.currentTime += 5;
	if (!isPlaying) {
		changeBar();
	}
}

// STOP MUSIC
function stopMusic() {
	playBtn.classList.add("_play");
	albumWrap.classList.add("_play");
	isPlaying = false;
}

// THE START OF THE NEXT TRACK
function goToNextMusic() {
	let newId = currentId;
	while (isShuffle && !loopOne && newId === currentId) {
		newId = Math.floor(Math.random() * Math.floor(list.length - 1));
	}

	if (!isShuffle && !loopOne) {
		currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
	}
	if (!isShuffle && loopOne) {
		currentId = currentId;
	}

	if (isShuffle) {
		currentId = newId;
	}
	init();
	document.getElementById(currentAudio).play();
}

// THE PLAYBACK MODE OF THE TRACK
function loop(e) {
	const audio = document.getElementById(currentAudio);

	if (!isLoop && !loopOne) {
		isLoop = true;
		loopOne = false;
		e.target.classList.remove("_off");
		e.target.classList.add("_loop");
		audio.loop = false;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	} else if (isLoop && !loopOne) {
		isLoop = true;
		loopOne = true;
		e.target.classList.remove("_loop");
		e.target.classList.add("_repeat");
		audio.loop = true;
		audio.onended = e => goToNextMusic();
		console.log(isLoop, loopOne);
	} else {
		isLoop = false;
		loopOne = false;
		e.target.classList.remove("_repeat");
		e.target.classList.add("_off");
		audio.loop = false;
		audio.onended = e => stopMusic();
		console.log(isLoop, loopOne);
	}
}

// PROGRESS 
function progress(e) {
	const audio = document.getElementById(currentAudio);
	const pos = (e.pageX - progressDiv.getClientRects()[0].x) / progressDiv.getClientRects()[0].width;
	audio.currentTime = pos * audio.duration;
	changeBar();
}

function init() {
	const audio = document.getElementById(currentAudio) === null ? new Audio() : document.getElementById(currentAudio);
	audio.src = list[currentId].url;
	audio.id = currentAudio;
	document.getElementById(currentAudio) === null ? document.body.appendChild(audio) : "";

	progressBar.style.transition = "none";
	progressBar.style.width = "0%";
	document.getElementById(currentAudio).currentTime = 0;

	albumClass.classList = (list[currentId].class);
	title.innerHTML = list[currentId].title;
	author.innerHTML = list[currentId].author;

	//set current time
	audio.addEventListener("loadedmetadata", function () {
		const leftMinute = Math.floor(audio.duration / 60);
		const leftSecond = Math.floor(audio.duration % 60);
		currentTimeIndicator.innerHTML = "00:00";
		leftTimeIndicator.innerHTML = ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
		progressBar.style.transition = "";
	});

	document.getElementById(currentAudio).onended = e => goToNextMusic(e);
}

	playBtn.addEventListener("click", play);
	loopBtn.addEventListener("click", loop);

	shuffleBtn.addEventListener("click", shuffle);
	forwardBtn.addEventListener("click", forward);
	backwardBtn.addEventListener("click", backward);

	prevBtn.addEventListener("click", e => nextMusic("prev"));
	nextBtn.addEventListener("click", e => nextMusic("next"));
	progressDiv.addEventListener("click", e => {
		progress(e);
	});

	init();
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBJSUZFKCkge1xuXHRjb25zdCBsaXN0ID0gW1xuXHR7XG5cdFx0aWQ6IDEsXG5cdFx0Y2xhc3M6ICdqZXJyeUhlcm1hbicsXG5cdFx0dXJsOiBcIm11c2ljL0plcnJ5SGVybWFuX1B1dE9uWW91clN1bmRheUNsb3RoZXMubXAzXCIsXG5cdFx0YXV0aG9yOiBcIkplcnJ5IEhlcm1hblwiLFxuXHRcdHRpdGxlOiBcIlB1dCBPbiBZb3VyIFN1bmRheVwiXG5cdH0sXG5cdHtcblx0XHRpZDogMixcblx0XHRjbGFzczogJ2VsdmlzUHJlc2xleScsXG5cdFx0dXJsOiBcIm11c2ljL0VsdmlzUHJlc2xleV9DYW50SGVscEZhbGxpbmdJbkxvdmUubXAzXCIsXG5cdFx0YXV0aG9yOiBcIkVsdmlzIFByZXNsZXlcIixcblx0XHR0aXRsZTogXCJDYW4ndCBGYWxsaW5nIEluIExvdmVcIlxuXHR9LFxuXHR7XG5cdFx0aWQ6IDMsXG5cdFx0Y2xhc3M6ICdyb3lPcmJpc29uJyxcblx0XHR1cmw6IFwibXVzaWMvUm95T3JiaXNvbl9PaFByZXR0eVdvbWFuLm1wM1wiLFxuXHRcdGF1dGhvcjogXCJSb3kgT3JiaXNvblwiLFxuXHRcdHRpdGxlOiBcIk9oLCBQcmV0dHkgV29tYW5cIlxuXHR9LFxuXHR7XG5cdFx0aWQ6IDQsXG5cdFx0Y2xhc3M6ICdmcmFua1NpbmF0cmEnLFxuXHRcdHVybDogXCJtdXNpYy9GcmFua1NpbmF0cmFfVGhhdHNMaWZlLm1wM1wiLFxuXHRcdGF1dGhvcjogXCJGcmFuayBTaW5hdHJhXCIsXG5cdFx0dGl0bGU6IFwiVGhhdCdzIExpZmVcIlxuXHR9LFxuXHR7XG5cdFx0aWQ6IDUsXG5cdFx0Y2xhc3M6ICdqaW1Dcm9jZScsXG5cdFx0dXJsOiBcIm11c2ljL0ppbUNyb2NlX1RpbWVJbkFCb3R0bGUubXAzXCIsXG5cdFx0YXV0aG9yOiBcIkppbSBDcm9jZVwiLFxuXHRcdHRpdGxlOiBcIlRpbWUgSW4gQSBCb3R0bGVcIlxuXHR9LFxuXHR7XG5cdFx0aWQ6IDYsXG5cdFx0Y2xhc3M6ICdyZWRIb3RDaGlsaVBlcHBlcnMnLFxuXHRcdHVybDogXCJtdXNpYy9SZWRIb3RDaGlsaVBlcHBlcnNfRGFya05lY2Vzc2l0aWVzLm1wM1wiLFxuXHRcdGF1dGhvcjogXCJSZWQgSG90IENoaWxpIFBlcHBlcnNcIixcblx0XHR0aXRsZTogXCJEYXJrIE5lY2Vzc2l0aWVzXCJcblx0fSxcblx0e1xuXHRcdGlkOiA3LFxuXHRcdGNsYXNzOiAnc3RlcGhhbmVHcmFwcGVsbGknLFxuXHRcdHVybDogXCJtdXNpYy9TdGVwaGFuZUdyYXBwZWxsaV9sYU1lci5tcDNcIixcblx0XHRhdXRob3I6IFwiU3RlcGhhbmUgR3JhcHBlbGxpXCIsXG5cdFx0dGl0bGU6IFwiTGEgTWVyXCJcblx0fSxcblx0e1xuXHRcdGlkOiA4LFxuXHRcdGNsYXNzOiAnZXZhbktpbmcnLFxuXHRcdHVybDogXCJtdXNpYy9FdmFuS2luZ19PdmVyd2F0Y2gubXAzXCIsXG5cdFx0YXV0aG9yOiBcIkV2YW4gS2luZ1wiLFxuXHRcdHRpdGxlOiBcIk92ZXJ3YXRjaFwiXG5cdH0sXG5cdHtcblx0XHRpZDogOSxcblx0XHRjbGFzczogJ0pSJyxcblx0XHR1cmw6IFwibXVzaWMvSlJfU291dGhTYWMubXAzXCIsXG5cdFx0YXV0aG9yOiBcIkpSXCIsXG5cdFx0dGl0bGU6IFwiU291dGhTYWNcIlxuXHR9LFxuXHR7XG5cdFx0aWQ6IDEwLFxuXHRcdGNsYXNzOiAndGhlRGVsaScsXG5cdFx0dXJsOiBcIm11c2ljL1RoZURlbGlfU3VuLm1wM1wiLFxuXHRcdGF1dGhvcjogXCJUaGUgRGVsaVwiLFxuXHRcdHRpdGxlOiBcIlN1blwiXG5cdH1cbl07XG5cbmxldCBjdXJyZW50SWQgPSAwO1xubGV0IGlzUGxheWluZyA9IGZhbHNlO1xubGV0IGlzTG9vcCA9IHRydWU7XG5sZXQgbG9vcE9uZSA9IGZhbHNlO1xubGV0IGlzU2h1ZmZsZSA9IGZhbHNlO1xubGV0IGN1cnJlbnRBdWRpbyA9IFwibXVzaWMxXCI7XG5sZXQgdGltZXIgPSBudWxsO1xuXG5jb25zdCBhbGJ1bVdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsYnVtXCIpO1xuY29uc3QgY3VycmVudFRpbWVJbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm11c2ljVGltZV9fY3VycmVudFwiKTtcbmNvbnN0IGxlZnRUaW1lSW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tdXNpY1RpbWVfX2xhc3RcIik7XG5jb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVuZ3RoXCIpO1xuY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm11c2ljSW5mb19fbmFtZVwiKTtcbmNvbnN0IGF1dGhvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubXVzaWNJbmZvX19hdXRob3JcIik7XG5cbmNvbnN0IGFsYnVtQ2xhc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzQWxidW1cIik7XG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5XCIpO1xuY29uc3QgbG9vcEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9vcFwiKTtcbmNvbnN0IHNodWZmbGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNodWZmbGVcIik7XG5jb25zdCBmb3J3YXJkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3J3YXJkXCIpO1xuY29uc3QgYmFja3dhcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2t3YXJkXCIpO1xuY29uc3QgcHJldkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldlwiKTtcbmNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG5jb25zdCBwcm9ncmVzc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZ3Jlc3NcIik7XG5cbi8vIEJVVFRPTiBQTEFZXG5mdW5jdGlvbiBwbGF5KGUpIHtcblx0aWYgKCFpc1BsYXlpbmcpIHtcblx0XHRlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiX3BsYXlcIik7XG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9wYXVzZVwiKTtcblxuXHRcdGFsYnVtV3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiX3BsYXlcIik7XG5cdFx0YWxidW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJfcGF1c2VcIik7XG5cblx0XHRpc1BsYXlpbmcgPSB0cnVlO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRBdWRpbykucGxheSgpO1xuXHRcdHNob3dUaW1lKCk7XG5cdH0gZWxzZSB7XG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcIl9wYXVzZVwiKTtcblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX3BsYXlcIik7XG5cblx0XHRhbGJ1bVdyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9wYXVzZVwiKTtcblx0XHRhbGJ1bVdyYXAuY2xhc3NMaXN0LmFkZChcIl9wbGF5XCIpO1xuXG5cdFx0aXNQbGF5aW5nID0gZmFsc2U7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudEF1ZGlvKS5wYXVzZSgpO1xuXHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXHR9XG59XG5cbi8vIFRJTUVcbmZ1bmN0aW9uIGNoYW5nZUJhcigpIHtcblx0Y29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pO1xuXHRjb25zdCBwZXJjZW50YWdlID0gKGF1ZGlvLmN1cnJlbnRUaW1lIC8gYXVkaW8uZHVyYXRpb24pLnRvRml4ZWQoMyk7XG5cdHByb2dyZXNzQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuXG5cdC8vc2V0IGN1cnJlbnQgdGltZVxuXHRjb25zdCBtaW51dGUgPSBNYXRoLmZsb29yKGF1ZGlvLmN1cnJlbnRUaW1lIC8gNjApO1xuXHRjb25zdCBzZWNvbmQgPSBNYXRoLmZsb29yKGF1ZGlvLmN1cnJlbnRUaW1lICUgNjApO1xuXHRjb25zdCBsZWZ0VGltZSA9IGF1ZGlvLmR1cmF0aW9uIC0gYXVkaW8uY3VycmVudFRpbWU7XG5cdGN1cnJlbnRUaW1lSW5kaWNhdG9yLmlubmVySFRNTCA9IChcIjBcIiArIG1pbnV0ZSkuc3Vic3RyKC0yKSArIFwiOlwiICsgKFwiMFwiICsgc2Vjb25kKS5zdWJzdHIoLTIpO1xuXG5cdC8vc2V0IGxlZnQgdGltZVxuXHRjb25zdCBsZWZ0TWludXRlID0gTWF0aC5mbG9vcihsZWZ0VGltZSAvIDYwKTtcblx0Y29uc3QgbGVmdFNlY29uZCA9IE1hdGguZmxvb3IobGVmdFRpbWUgJSA2MCk7XG5cblx0bGVmdFRpbWVJbmRpY2F0b3IuaW5uZXJIVE1MID0gKFwiMFwiICsgbGVmdE1pbnV0ZSkuc3Vic3RyKC0yKSArIFwiOlwiICsgKFwiMFwiICsgbGVmdFNlY29uZCkuc3Vic3RyKC0yKTtcblxuXHQvL3NldCB0aW1lIGJhclxuXHRwcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IHBlcmNlbnRhZ2UgKiAxMDAgKyBcIiVcIjtcbn1cblxuZnVuY3Rpb24gc2hvd1RpbWUoKSB7XG5cdHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gY2hhbmdlQmFyKCksIDUwMCk7XG59XG5cbi8vIFNXSVRDSElORyBNVVNJQ1xuZnVuY3Rpb24gbmV4dE11c2ljKG1vZGUpIHtcblx0cGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiX3BhdXNlXCIpO1xuXHRwbGF5QnRuLmNsYXNzTGlzdC5hZGQoXCJfcGxheVwiKTtcblxuXHRhbGJ1bVdyYXAuY2xhc3NMaXN0LnJlbW92ZShcIl9wYXVzZVwiKTtcblx0YWxidW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJfcGxheVwiKTtcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pLnBhdXNlKCk7XG5cdGlzUGxheWluZyA9IGZhbHNlO1xuXHRjbGVhckludGVydmFsKHRpbWVyKTtcblxuXHRpZiAobW9kZSA9PT0gXCJuZXh0XCIpIHtcblx0XHRjdXJyZW50SWQgPSBjdXJyZW50SWQgKyAxID4gbGlzdC5sZW5ndGggLSAxID8gMCA6IGN1cnJlbnRJZCArIDE7XG5cdFx0aW5pdCgpO1xuXHR9IGVsc2Uge1xuXHRcdGN1cnJlbnRJZCA9IGN1cnJlbnRJZCAtIDEgPCAwID8gbGlzdC5sZW5ndGggLSAxIDogY3VycmVudElkIC0gMTtcblx0XHRpbml0KCk7XG5cdH1cbn1cblxuLy8gU1RBUlRJTkcgQSBSQU5ET00gVFJBQ0tcbmZ1bmN0aW9uIHNodWZmbGUoZSkge1xuXHRpc1NodWZmbGUgPSAhaXNTaHVmZmxlO1xuXHRpZiAoaXNTaHVmZmxlKSB7XG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9zaHVmZmxlXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJfc2h1ZmZsZVwiKTtcblx0fVxufVxuXG4vLyA1IFNFQ09ORFMgQUdPXG5mdW5jdGlvbiBiYWNrd2FyZCgpIHtcblx0Y29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pO1xuXHRhdWRpby5jdXJyZW50VGltZSAtPSA1O1xuXHRpZiAoIWlzUGxheWluZykge1xuXHRcdGNoYW5nZUJhcigpO1xuXHR9XG59XG5cbi8vIDUgU0VDT05EUyBBSEVBRFxuZnVuY3Rpb24gZm9yd2FyZCgpIHtcblx0Y29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pO1xuXHRhdWRpby5jdXJyZW50VGltZSArPSA1O1xuXHRpZiAoIWlzUGxheWluZykge1xuXHRcdGNoYW5nZUJhcigpO1xuXHR9XG59XG5cbi8vIFNUT1AgTVVTSUNcbmZ1bmN0aW9uIHN0b3BNdXNpYygpIHtcblx0cGxheUJ0bi5jbGFzc0xpc3QuYWRkKFwiX3BsYXlcIik7XG5cdGFsYnVtV3JhcC5jbGFzc0xpc3QuYWRkKFwiX3BsYXlcIik7XG5cdGlzUGxheWluZyA9IGZhbHNlO1xufVxuXG4vLyBUSEUgU1RBUlQgT0YgVEhFIE5FWFQgVFJBQ0tcbmZ1bmN0aW9uIGdvVG9OZXh0TXVzaWMoKSB7XG5cdGxldCBuZXdJZCA9IGN1cnJlbnRJZDtcblx0d2hpbGUgKGlzU2h1ZmZsZSAmJiAhbG9vcE9uZSAmJiBuZXdJZCA9PT0gY3VycmVudElkKSB7XG5cdFx0bmV3SWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKGxpc3QubGVuZ3RoIC0gMSkpO1xuXHR9XG5cblx0aWYgKCFpc1NodWZmbGUgJiYgIWxvb3BPbmUpIHtcblx0XHRjdXJyZW50SWQgPSBjdXJyZW50SWQgKyAxID4gbGlzdC5sZW5ndGggLSAxID8gMCA6IGN1cnJlbnRJZCArIDE7XG5cdH1cblx0aWYgKCFpc1NodWZmbGUgJiYgbG9vcE9uZSkge1xuXHRcdGN1cnJlbnRJZCA9IGN1cnJlbnRJZDtcblx0fVxuXG5cdGlmIChpc1NodWZmbGUpIHtcblx0XHRjdXJyZW50SWQgPSBuZXdJZDtcblx0fVxuXHRpbml0KCk7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRBdWRpbykucGxheSgpO1xufVxuXG4vLyBUSEUgUExBWUJBQ0sgTU9ERSBPRiBUSEUgVFJBQ0tcbmZ1bmN0aW9uIGxvb3AoZSkge1xuXHRjb25zdCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRBdWRpbyk7XG5cblx0aWYgKCFpc0xvb3AgJiYgIWxvb3BPbmUpIHtcblx0XHRpc0xvb3AgPSB0cnVlO1xuXHRcdGxvb3BPbmUgPSBmYWxzZTtcblx0XHRlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiX29mZlwiKTtcblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2xvb3BcIik7XG5cdFx0YXVkaW8ubG9vcCA9IGZhbHNlO1xuXHRcdGF1ZGlvLm9uZW5kZWQgPSBlID0+IGdvVG9OZXh0TXVzaWMoKTtcblx0XHRjb25zb2xlLmxvZyhpc0xvb3AsIGxvb3BPbmUpO1xuXHR9IGVsc2UgaWYgKGlzTG9vcCAmJiAhbG9vcE9uZSkge1xuXHRcdGlzTG9vcCA9IHRydWU7XG5cdFx0bG9vcE9uZSA9IHRydWU7XG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcIl9sb29wXCIpO1xuXHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJfcmVwZWF0XCIpO1xuXHRcdGF1ZGlvLmxvb3AgPSB0cnVlO1xuXHRcdGF1ZGlvLm9uZW5kZWQgPSBlID0+IGdvVG9OZXh0TXVzaWMoKTtcblx0XHRjb25zb2xlLmxvZyhpc0xvb3AsIGxvb3BPbmUpO1xuXHR9IGVsc2Uge1xuXHRcdGlzTG9vcCA9IGZhbHNlO1xuXHRcdGxvb3BPbmUgPSBmYWxzZTtcblx0XHRlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiX3JlcGVhdFwiKTtcblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX29mZlwiKTtcblx0XHRhdWRpby5sb29wID0gZmFsc2U7XG5cdFx0YXVkaW8ub25lbmRlZCA9IGUgPT4gc3RvcE11c2ljKCk7XG5cdFx0Y29uc29sZS5sb2coaXNMb29wLCBsb29wT25lKTtcblx0fVxufVxuXG4vLyBQUk9HUkVTUyBcbmZ1bmN0aW9uIHByb2dyZXNzKGUpIHtcblx0Y29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pO1xuXHRjb25zdCBwb3MgPSAoZS5wYWdlWCAtIHByb2dyZXNzRGl2LmdldENsaWVudFJlY3RzKClbMF0ueCkgLyBwcm9ncmVzc0Rpdi5nZXRDbGllbnRSZWN0cygpWzBdLndpZHRoO1xuXHRhdWRpby5jdXJyZW50VGltZSA9IHBvcyAqIGF1ZGlvLmR1cmF0aW9uO1xuXHRjaGFuZ2VCYXIoKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcblx0Y29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pID09PSBudWxsID8gbmV3IEF1ZGlvKCkgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pO1xuXHRhdWRpby5zcmMgPSBsaXN0W2N1cnJlbnRJZF0udXJsO1xuXHRhdWRpby5pZCA9IGN1cnJlbnRBdWRpbztcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudEF1ZGlvKSA9PT0gbnVsbCA/IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXVkaW8pIDogXCJcIjtcblxuXHRwcm9ncmVzc0Jhci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG5cdHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gXCIwJVwiO1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pLmN1cnJlbnRUaW1lID0gMDtcblxuXHRhbGJ1bUNsYXNzLmNsYXNzTGlzdCA9IChsaXN0W2N1cnJlbnRJZF0uY2xhc3MpO1xuXHR0aXRsZS5pbm5lckhUTUwgPSBsaXN0W2N1cnJlbnRJZF0udGl0bGU7XG5cdGF1dGhvci5pbm5lckhUTUwgPSBsaXN0W2N1cnJlbnRJZF0uYXV0aG9yO1xuXG5cdC8vc2V0IGN1cnJlbnQgdGltZVxuXHRhdWRpby5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGxlZnRNaW51dGUgPSBNYXRoLmZsb29yKGF1ZGlvLmR1cmF0aW9uIC8gNjApO1xuXHRcdGNvbnN0IGxlZnRTZWNvbmQgPSBNYXRoLmZsb29yKGF1ZGlvLmR1cmF0aW9uICUgNjApO1xuXHRcdGN1cnJlbnRUaW1lSW5kaWNhdG9yLmlubmVySFRNTCA9IFwiMDA6MDBcIjtcblx0XHRsZWZ0VGltZUluZGljYXRvci5pbm5lckhUTUwgPSAoXCIwXCIgKyBsZWZ0TWludXRlKS5zdWJzdHIoLTIpICsgXCI6XCIgKyAoXCIwXCIgKyBsZWZ0U2Vjb25kKS5zdWJzdHIoLTIpO1xuXHRcdHByb2dyZXNzQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuXHR9KTtcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50QXVkaW8pLm9uZW5kZWQgPSBlID0+IGdvVG9OZXh0TXVzaWMoZSk7XG59XG5cblx0cGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheSk7XG5cdGxvb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxvb3ApO1xuXG5cdHNodWZmbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNodWZmbGUpO1xuXHRmb3J3YXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmb3J3YXJkKTtcblx0YmFja3dhcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJhY2t3YXJkKTtcblxuXHRwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IG5leHRNdXNpYyhcInByZXZcIikpO1xuXHRuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IG5leHRNdXNpYyhcIm5leHRcIikpO1xuXHRwcm9ncmVzc0Rpdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG5cdFx0cHJvZ3Jlc3MoZSk7XG5cdH0pO1xuXG5cdGluaXQoKTtcbn0pKCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
