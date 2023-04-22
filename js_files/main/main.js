//main.js - hlavny loop hry - volanie vsetkych potrebnych funkcii pre chod hry

//Funkcia animate()
function animate(){
    if(animation) cancelAnimationFrame(animation);  //cancelAnimationFrame - rusi frame request, ktory bol vytvoreny requestAnimationFrame (riadok 17)

    if(!stopFunction){      //Ak riadenie funkcie nebolo "zapnute" -> stopFunction === false
        context1.clearRect(0,0,canvas1.width,canvas1.height); //Vycistime plochu pri kazdej animacii
        context2.clearRect(0,0,canvas1.width,canvas1.height);
        context3.clearRect(0,0,canvas1.width,canvas1.height);
        context1.drawImage(background_1,0,0,canvas2.width,canvas2.height); //Vykreslovanie pozadia rieky
        context2.drawImage(background_2,0,0,canvas2.width,canvas2.height); //Vykreslovanie pozadia cesty
        frogger.draw();     //Vykreslenie zaby
        frogger.update();   //Riadenie pohybu zaby
        handleObstacles();  //Volanie funkcie handleObstacles() - riadi vsetky prekazky
        frame++;             
        animation = requestAnimationFrame(animate); //requestAnimationFrame - animation loop - rekurzivna funkcia - vola vsetky funkcie potrebne pre vytvorenie animacie
    } else 
        return;
}