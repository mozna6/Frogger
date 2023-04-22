//pages.js - subor, v ktorom pracujem s nacitavanim jednotlivych obrazoviek

//Funkcia startGame() - sluzi na zobrazenie hlavnej obrazovky hry
function startGame(){
    sound(); //sound() - zvukovy efekt kliknutia
    let menu = document.querySelector(".menu");     //Vyberieme element s class menu
    menu.setAttribute("hidden","");     //Nastavime class menu -> atribut hidden
    document.querySelector(".canvas").removeAttribute("hidden"); //Pre element s class canvas odstranim atribut hidden
    setMode(1); //setMode() - nastavenie modu spustenia
    animate();  //animate() - riadi chod celej hry
    let hisc = document.querySelector("#highscore");    //Vyberieme element s id highscore
    let timel = document.querySelector("#timer");   //Vyberieme element s id timer
    let text2 = document.querySelector("#text2");   //Vyberieme element s id text2
    let text3 = document.querySelector("#text3");   //Vyberieme element s id text3
    timel.setAttribute("hidden","");    //Nastavime hidden atribut pre element
    text3.setAttribute("hidden","");    
    hisc.removeAttribute("hidden");     //Odstranime hidden atribut pre element
    text2.removeAttribute("hidden");
}

//Funkcia controls() - sluzi na zobrazenie obrazovky ovladania
function controls(){
    sound();
    let menu = document.querySelector(".menu");
    menu.setAttribute("hidden","");
    document.querySelector(".control").removeAttribute("hidden"); 
}

//Funkcia controlsMenu() - sluzi na zobrazenie obrazovky menu
function controlsMenu(){
    sound();
    let control = document.querySelector(".control");
    control.setAttribute("hidden","");
    document.querySelector(".menu").removeAttribute("hidden");   
}

//Funkcia setting() - sluzi na zobrazenie obrazovky nastavenia
function setting(){
    sound();
    let menu = document.querySelector(".menu");
    menu.setAttribute("hidden","");
    document.querySelector(".settings").removeAttribute("hidden"); 
}

//Funkcia settingsMenu() - sluzi na zobrazenie obrazovky menu
function settingMenu(){
    sound();
    let settings = document.querySelector(".settings");
    settings.setAttribute("hidden","");
    document.querySelector(".menu").removeAttribute("hidden"); 
}

//Funkcia againButton() - sluzi na opatovne spustenie hry a zobrazenie hernej obrazovky
function againButton(){
    collisions.src = './img/collisions.png';    //Prehodenie src obrazkov -> pre animaciu splechnutia/havarie
    splash.src = './img/splash.png';
    moving = true;  //moving -> aby bol umozneny pohyb so zabou
    context3.clearRect(0,0,canvas1.width,canvas1.height);   //Vycistenie plochy kanvasu
    frogger.frameX = 1; //Staticky obrazok zaby
    model.zero();   //Resetujeme skore aj pre observer
    stopFunction = false;   //Aby sa opat mohli vytvarat animacie
    sound();
    let gameOver = document.querySelector(".container");
    gameOver.setAttribute("hidden","");
    let bckg = document.querySelector(".background");
    bckg.setAttribute("hidden","");
    animate();
    if (mode == 2) {    //Ak bol spusteny mod challenge
        timerSound.currentTime = 0; //Zvukovy efekt nastavime na zaciatok
        timeCount(45);  //Funkcia timeCount() - spustime casovac so 45 sekundami
    }
}

//Funkcia continueButton() - sluzi na opatovne spustenie hry pri zastaveni
function continueButton(){
    moving = true;  //moving -> aby bol umozneny pohyb so zabou
    stopFunction = false;   //Aby sa opat mohli vytvarat animacie
    sound();
    let gameOver = document.querySelector(".container");
    gameOver.setAttribute("hidden","");
    let bckg = document.querySelector(".background");
    bckg.setAttribute("hidden","");
    animate();
    if (mode == 2){ //Ak bol spusteny mod challenge
        let timerEl = document.querySelector('#timer');     //Vyberieme element s id timer - pre zobrazenie odpocitavaneho casu
        let tmpTime = timerEl.textContent;
        timeCount(tmpTime); //Cas spustame od casu, ktory bol pri zastaveni hry
        if(timerSound.currentTime !== 0) {  //Ak sme hru zastavili bez zvukoveho efektu casovaca -> play sa nespusti
            timerSound.play();
        }
        
    }
    
}

//Funkcia menuButton() - sluzi na zobrazenie obrazovky menu
function menuButton(){
    collisions.src = './img/collisions.png';
    splash.src = './img/splash.png';
    moving = true;
    context3.clearRect(0,0,canvas1.width,canvas1.height);
    frogger.frameX = 1;
    score = 0;
    model.zero();
    sound();
    stopFunction = false;
    let gameOver = document.querySelector(".container");
    gameOver.setAttribute("hidden","");
    let bckg = document.querySelector(".background");
    bckg.setAttribute("hidden","");
    let canvas = document.querySelector(".canvas");
    canvas.setAttribute("hidden","");
    document.querySelector(".menu").removeAttribute("hidden");
    if (mode == 2) {
        timerSound.currentTime = 0; 
        clearInterval(timer_);  //Zastavenie odpocitavania
    }
}

//Funkcia startChallenge() - sluzi na zobrazenie obrazovky hry pre challenge
function startChallenge(){
    sound(); 
    let menu = document.querySelector(".menu"); //Vyberieme menu
    menu.setAttribute("hidden",""); //Schovame menu
    document.querySelector(".canvas").removeAttribute("hidden"); //Zobrazime canvas
    let hisc = document.querySelector("#highscore");
    let timel = document.querySelector("#timer");
    let text2 = document.querySelector("#text2");
    let text3 = document.querySelector("#text3");
    hisc.setAttribute("hidden",""); 
    text2.setAttribute("hidden","");
    timel.removeAttribute("hidden");
    text3.removeAttribute("hidden");
    timerSound.currentTime = 0;
    setMode(2); //setMode(2) - nastavi mod pre challenge
    timeCount(45);  //Spustenie casovacu
    animate();
};