//setup.js - subor, v ktorom su deklarovane konstanty a premenne

//Premenne pre pracu s canvasmi - vyberam canvas podla ID
const canvas1 = document.getElementById('canvas1'); 
const context1 = canvas1.getContext('2d');
canvas1.width = 672;
canvas1.height = 744;

const canvas2 = document.getElementById('canvas2');
const context2 = canvas2.getContext('2d');
canvas2.width = 672;
canvas2.height = 744;

const canvas3 = document.getElementById('canvas3');
const context3 = canvas3.getContext('2d');
canvas3.width = 672;
canvas3.height = 744;

const canvas4 = document.getElementById('canvas4');
const context4 = canvas4.getContext('2d');
canvas4.width = 672;
canvas4.height = 744;


//Deklaracia globalnych konstant
const grid = 74;    //Velkost skoku
let keys = [];      //Prazdne pole, do ktoreho sa budu ukladat stlacene klavesy
let frame = 0;      //Frame - aby sme mohli nieco vykonat napr. kazdych 100 frames
let gameSpeed=1;    //Rychlost prekazok
let safe = false;   //Safe - aby som zistil, ci sa nachadzam na bezpecnej ploche

//Deklaracia poli pre prekazky
const carsArray = [];   
const logsArray = [];

//Konstanty, do ktorych si nacitavam pozadie a ine obrazky
const background_1 = new Image();
background_1.src = './img/river.png';
const background_2 = new Image();
background_2.src = './img/background2.png';

const collisions = new Image(); 
collisions.src = './img/collisions.png';    //Obrazok kolizie
const splash = new Image();
splash.src = './img/splash.png';            //Obrazok splechnutia
const death = new Image();
death.src = './img/death.png';              //Obrazok smrti

const turtle = new Image();
turtle.src = './img/turtle.png';            //Obrazok korytnacky
const log = new Image();
log.src = './img/logs.png';                 //Obrazok polena
const car = new Image();
car.src = './img/car2.png';                 //Obrazok aut

const carReverse = new Image();
carReverse.src = './img/carReverse2.png';   //Obrazok otocenych aut

//Obrazky pre zabu - staticka
const froggerSpriteStatic1 = new Image();
froggerSpriteStatic1.src = './img/frogger1.png';    
const froggerSpriteStatic2 = new Image();
froggerSpriteStatic2.src = './img/frogger2.png';
const froggerSpriteStatic3 = new Image();
froggerSpriteStatic3.src = './img/frogger3.png';
const froggerSpriteStatic4 = new Image();
froggerSpriteStatic4.src = './img/frogger4.png';

//Obrazky pre zabu - dynamicka
const froggerSpriteDynamic1 = new Image();
froggerSpriteDynamic1.src = './img/froggerdynamic1.png';
const froggerSpriteDynamic2 = new Image();
froggerSpriteDynamic2.src = './img/froggerdynamic2.png';
const froggerSpriteDynamic3 = new Image();
froggerSpriteDynamic3.src = './img/froggerdynamic3.png';
const froggerSpriteDynamic4 = new Image();
froggerSpriteDynamic4.src = './img/froggerdynamic4.png';

var stopFunction = false;   //Premenna, ktora riadi chod hlavnej funkcie

//Konstanty pre pracu s hudbou a zvukom
const backgroundMusic = new Audio('./sound/backgroundmusic.mp3');   //Background muzika
const clickSound = new Audio('./sound/clicksound.wav');             //Klik - zvukovy efekt
const splashSound = new Audio('./sound/splash.wav');                //Splechnutie - zvukovy efekt
const crashSound = new Audio('./sound/carcrash.mp3');               //Havaria auta - zvukovy efekt
const frogSound = new Audio('./sound/frog.mp3');                    //Zvuk zaby
const timerSound = new Audio('./sound/timer.mp3');                  //Casovac - zvukovy efekt
var soundTurnedOn = 0;  //Riadi hlasitost zvukovych efektov


var animation;  //Premenna pre zistenie, ci uz bola vytvorena animacia -> nasledne mohla byt zrusena

var moving = true;  //Premenna , ktora nesie info o tom, ci je zaba v pohybe alebo nie -> teda, ci je stlacena klavesa sipky
var tmpX = 0;       //Docasna pozicia x
var tmpY = 0;       //Docasna pozicia y

var mode = 0;   //Urcuje, ci bola hra spustena v normalnom mode alebo v challenge

var seconds;    //Premenna pre pocet sekund
var timer_;     //Premenna pre setInterval funkciu





