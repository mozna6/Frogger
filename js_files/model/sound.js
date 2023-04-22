//sound.js - subor, v ktorom riadime zvukove efekty

//Funkcia music(x) - funkcia, ktora riadi zvuk muziky v pozadi ||| parameter x - hlasitost
function music(x){
    backgroundMusic.volume=x/100;   //Nastavenie hlasitosti
    backgroundMusic.play();         //Spustenie
}

//Event listener pre backgroundMusic - ak muzika skonci -> nastavime ju na zaciatok a opat spustime
backgroundMusic.addEventListener('ended', function() { 
    this.currentTime = 0;
    this.play();
}, false);

//Funkcia sound() - funkcia, ktora riadi zvukove efekty
function sound(){
    clickSound.volume=soundTurnedOn;
    clickSound.play();
}

var musicSlider = document.getElementById('musicSlider');   //Vyberame element s id musicSlider - element pre "posuvac"
var musicValue = document.getElementById('musicText');      //Vyberame element s id musicText - zobrazenie hodnoty
musicValue.innerHTML = musicSlider.value;   //Nastavime hodnotu na obrazovke na hodnotu na "posuvaci"

//musicSlider.oninput -> vykonanie pri vstupe (posunuti) od pouzivatela
musicSlider.oninput = function(){
    musicValue.innerHTML = this.value;  //Nastavime hodnotu na obrazovke na hodnotu na "posuvaci"
    let x = musicSlider.value;  //Hodnotu z "posuvaca" ulozime do x
    let color = 'linear-gradient(90deg,rgb(4,3,66)' + x + '%,rgb(118, 110, 138)' + x + '%)';    //Zmena farby pri posuvani
    musicSlider.style.background = color;
    music(x);   //Volame funkciu music, ktorej odovzdavame hodnotu s posuvaca
}

//To iste ako pre musicSlider, len pre zvukove efekty
var soundSlider = document.getElementById('soundSlider');
var soundValue = document.getElementById('soundText');
soundValue.innerHTML = soundSlider.value;

soundSlider.oninput = function(){
    soundValue.innerHTML = this.value;
    let y = soundSlider.value;
    let color = 'linear-gradient(90deg,rgb(4,3,66)' + y + '%,rgb(118, 110, 138)' + y + '%)';
    soundSlider.style.background = color;
    soundTurnedOn = y/100;
    
}