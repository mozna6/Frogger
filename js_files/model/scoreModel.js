//scoreModel.js - vytvorenie objektu, ktory pracuje so skore a budu pren vytvorene observers

//Objekt, pre ktory vytvaram observers
class scoreModel{
    //Constructor - skore a pole observerov
    constructor(){
        this.score = 0;    //Skore
        this.observers = []; //Pole, ktore bude obsahovat vsetky observers - budu oboznamene o zmene
        this.scoreHistory = [];
        this.mode = 0;
    }

    //Metoda increment() - zvysi hodnotu skore
    increment(){
        this.score++;   //Inkrementujeme skore
        this.notifyObservers(); //Kazdy observer bude upozorneny na zmenu, teda na score++;
    }

    //Metoda zero() - vymaze hodnotu na nulu
    zero(){
        this.score = 0;
        this.notifyObservers(); //Kazdy observer bude upozorneny na zmenu, teda na score++;
    }

    //Metoda removeObserver() - vymaze observer z pola
    removeObserver(obs){
        this.observers = this.observers.filter((observ) => observ!==obs);   //Vytvorime nove pole observerov bez toho, ktory bol odstraneny
    }

    //Metoda addObserver() - prida observer ||| parameter - samotny observer, ktory sa prida do pola
    addObserver(obs){
        this.observers.push(obs);    //"Push-neme" observer do pola
    }

    //Metoda notifyObservers() - prejde celym polom observerov a upozorni na zmenu
    notifyObservers(){
        for (let obs of this.observers) {   //For loop pre cele pole
            obs.update(this);       //This - samotny model - mozme sa dostat k ostatnym atributom
        }
    }

}