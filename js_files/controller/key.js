//key.js - event listener, ktore zachytavaju stlacenie klavesy

//Event listener, ktory zachyti stlacenie tlacidka
window.addEventListener('keydown',function(e){
    keys = [];              //Pole, ktore bude uchovavat, to co stlacime
    keys[e.keyCode] = true; //Pre kod tlacidka
    frogger.frameY = 0;

});

//Event listener - vymaze key, ktory bol stlaceny
window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];     //Vymazeme, prvok z pola
    frogger.moving = false;     //Nastavime moving na false - umoznime zabe spravit dalsi jump pri stlaceni sipky
    frogger.frameY = 0;
});
