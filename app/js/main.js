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
		isPlaying = true;
		document.getElementById(currentAudio).play();
		showTime();
	} else {
		e.target.classList.remove("_pause");
		e.target.classList.add("_play");
		isPlaying = false;
		document.getElementById(currentAudio).pause();
		clearInterval(timer);
	}
}