//utilities.js - funkcie a konstanty potrebne pre fungovanie hry

const model = new scoreModel();         //Vytvorenie konstanty model na zaklade class-y scoreMode
const eObs1 = new elementObserver('score');     //Vytvorenie observera, ktory bude menit aktualne skore
const eObs2 = new elementObserver2('highscore'); //Vytvorenie observera, ktory bude riadit high score

//Pridanie observer-ov do pola
model.addObserver(eObs1);   
model.addObserver(eObs2);

//Funkcia setmode() - > funkcia nastavi herny mod na zaklade vybraneho modu
function setMode(mod){
    if (mod == 1) {
        model.mode = 1;
        mode = 1;
    }else if (mod == 2){
        model.mode = 2;
        mode = 2;
    }
}


//Funkcia scored() - zvysime skore a resetujeme zabu na povodnu poziciu
function scored(){
    model.increment();  //Zvysenie skore
    frogSound.volume=soundTurnedOn;     //Zvukovy efekt
    frogSound.play();
    if (mode == 1) gameSpeed += 0.3;  //Zvysime rychlost - len pri zakladnom hernom mode
    frogger.x = canvas1.width/2 - frogger.width/2;  //Vratime zabu na povodnu poziciu
    frogger.y = canvas1.height - frogger.height ;   
}


//Funkcia collision() - first (zaba), second (auto) - zistime, kde sa zaba s autom nezrazaju a vratime opacnu hodnotu (true/false)
function collision(first,second){
    return !(first.x > second.x + second.width || first.x + first.width < second.x || first.y > second.y + second.height || first.y + first.height < second.y);
}

//Funkcia resetGame() - zastavi hru pri "smrti" a zobrazi nam game over screen
function resetGame(){
    gameSpeed = 1;  //Nastavenie povodnej rychlosti
    frogger.x = canvas1.width/2 - frogger.width/2;  //Vratime zabu na povodnu poziciu
    frogger.y = canvas1.height - frogger.height ;
    document.querySelector(".container").removeAttribute("hidden"); 
    document.querySelector(".background").removeAttribute("hidden"); 
    document.querySelector(".gameOver").removeAttribute("hidden");
    let pauseEl = document.querySelector(".pause");
    pauseEl.setAttribute("hidden","hidden");
    stopFunction = true;    //Riadenie funkcie nastavime na hodnotu true
    if (seconds != -1) context3.drawImage(collisions,0,0,100,100,tmpX,tmpY,100,100);    //Pri ukonceni hry kvoli casovemu limitu sa nevykresli obrazok zrazky
    
    if (mode == 2) {        //Ak bol spusteny mod challenge
        timerSound.pause(); //Zastavenie zvukoveho efektu
        if(seconds == -1) {
            timerSound.currentTime = 0; //Resetovanie casovacu
        }
        clearInterval(timer_);  //Zastavenie casovacu
    } 
}

//function timeCount - casovac
function timeCount(sec){
    let timeElem = document.querySelector('#timer');    //Vyberieme element, na ktorom chceme zobrazovat odpocitavanie casu
    timeElem.innerHTML = sec;
    sec = sec - 1;
    timer_ = setInterval(() => {    //Nastavime interval - vykonanie funkcie kazdu sekundu
        timeElem.innerHTML = sec;   //Zmena casu na obrazovke
        sec--;
        seconds = sec;
        if(sec<=6){                 //Pri urcitom case sa spusti zvukovy efekt
            timerSound.volume = soundTurnedOn;
            timerSound.play();
        }
        if (sec == -1) {            //Pri dosiahnuti 0 sa zavola funkcia resetGame() a zastavi odpocitavanie
            resetGame();
            clearInterval(timer_);
        }
    }, 1000);
}

//function pauseGame() - pozastavenie hry a zobrazenie pause obrazovky
function pauseGame(){
    if (!stopFunction) {
        stopFunction = true;
        document.querySelector(".container").removeAttribute("hidden"); 
        document.querySelector(".background").removeAttribute("hidden"); 
        document.querySelector(".pause").removeAttribute("hidden");
        let gameOverEl = document.querySelector(".gameOver");
        gameOverEl.setAttribute("hidden","hidden");
        
        if (mode == 2) {            //Pri mode challenge sa zastavi cas 
            clearInterval(timer_);
            timerSound.pause();
        }
    }

}





