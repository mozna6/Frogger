//observer.js - vytvorenie observerov pre scoreModel

//Class definicia observera - observer pre aktualne skore
class elementObserver{
    //Constructor - parameter - ID elementu
    constructor(elementId){
        this.element = document.getElementById(elementId);  //Vyberieme element, ktory chceme zmenit
    }

    //Metoda update(model) - mozeme zmenit score v elemente ||| parameter model - aby sme mali pristup ku score
    update(model){
        this.element.innerHTML = model.score;   //Zmena na aktualne skore
    }
}

//Class definicia observera - observer pre najvyssie skore
class elementObserver2{
    //Constructor - parameter - ID elementu
    constructor(elementId){
        this.element = document.getElementById(elementId);  //Vyberieme element, ktory chceme zmenit
        
    }

    //Metoda update(model) - mozeme zmenit score v elemente ||| parameter model - aby sme mali pristup ku score
    update(model){
        if (model.mode == 1){
            model.scoreHistory.push(model.score);   //Pridanie prvku do pola
            this.element.innerHTML = Math.max(...model.scoreHistory);   //Vyberie najvyssie cislo z pola
        }
        
    }               
}
