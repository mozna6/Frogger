//frogger.js - subor pre vytvorenie objektu Frogger

//class Frogger - vytvarame class Frogger - postava, za ktoru hrame
class Frogger{         
    constructor(){                              //constructor() - "metoda" pre vytvorenie objektu danej triedy
        this.spriteWidth = 54;                  //Sirka sprite (obrazku)
        this.spriteHeight = 82;                 //Vyska sprite (obrazku)
        this.width = this.spriteWidth;          //Vyska zaby 
        this.height = this.spriteHeight/1.5;    //Sirka zaby
        this.x = canvas1.width/2 - this.width/2; //Pozicia x - pociatocna pri spusteni hry
        this.y = canvas1.height - this.height;  //Pozicia y - pociatocna pri spusteni hry
        this.moving = false ;                   //Premenna, ktora umoznuje pohyb
        this.frameX = 1;    //FrameX -> staticky obrazok zaby
        this.frameY = 0;    //FrameY -> dynamicky obrazok zaby

    }

    //Model
    //Metoda update() - pri kazdom pohybe spravi animaciu skoku a posunie zabu na ploche
    update(){     
        if(moving) {    
            if(keys[38]){  //Stlacenie sipky hore
                if(this.moving === false && this.y > this.height ){ //Podmienky aby sme sa nemohli dostat za okraj obrazokvy
                    this.y -= grid;         //Poloha sa musi zmenit o grid -> posunie sa hore
                    this.moving = true;     
                    this.frameX = 1;
                    this.frameY = 1;
                }
                if(this.moving === false && ((this.x < 220 && this.x > 160) || (this.x < 470 && this.x > 410))){    //Podmienky, ktore nam umoznia pohyb, ak sa dostaneme na lekno
                    this.y -= grid;         //Poloha sa musi zmenit o grid -> posunie sa hore
                    this.moving = true;     
                    this.frameX = 1;
                    this.frameY = 1;
                }
            }else if(keys[40]){ //Stlacenie sipky dole
                if(this.y < canvas1.height - this.height * 2 && this.moving === false){ //Podmienka, aby sa zaba nedostala za okraj
                    this.y += grid;         //Poloha sa musi zmenit o grid -> posunie sa dole
                    this.moving = true;
                    this.frameX = 2;
                    this.frameY = 2;
                }
                
            }else if(keys[37]){ //Stlacenie sipky vlavo
                if(this.x > this.width && this.moving === false){
                    this.x -= grid-25;
                    this.moving = true;
                    this.frameX = 3;
                    this.frameY = 3;
                }
                
            }else if(keys[39]){ //Stlacenie sipky vpravo
                if(this.x < canvas1.width - this.width * 2 && this.moving === false){
                    this.x += grid-25;
                    this.moving = true;
                    this.frameX = 4;
                    this.frameY = 4;
                }
                
            }else if(keys[80]){
                if(this.moving === false) {
                    pauseGame();
                    this.moving = true;
                }
                
            }
        }  
        
        if (this.y < 0) scored(); //Ak sa dostaneme hore - do ciela - zavola sa funkcia scored()
    }

    //View
    //Metoda draw() - vykreslovanie zaby na plochu - animacia pohybu
    draw(){  
        if(this.frameY == 0){   //Vykreslenie zaby v statickej podobe
            if(this.frameX === 1 )   context3.drawImage(froggerSpriteStatic2,0,0 ,54,38, this.x,this.y,this.width-5,this.height-10);
            else if(this.frameX === 2)    context3.drawImage(froggerSpriteStatic1,0,0 ,54,38, this.x,this.y,this.width-5,this.height-10);
            else if(this.frameX === 3)    context3.drawImage(froggerSpriteStatic4,0,0 ,38,54, this.x,this.y,this.height-10,this.width-5);
            else if(this.frameX === 4)    context3.drawImage(froggerSpriteStatic3,0,0 ,38,54, this.x,this.y,this.height-10,this.width-5);
        }

        //Vykreslovanie zaby v dynamickej podobe
        if(this.frameY === 1)   context3.drawImage(froggerSpriteDynamic2,0,0 ,54,74, this.x,this.y,this.width,74);
        else if(this.frameY === 2)    context3.drawImage(froggerSpriteDynamic1,0,0 ,54,74, this.x,this.y,this.width,74);
        else if(this.frameY === 4)    context3.drawImage(froggerSpriteDynamic4,0,0 ,74,54, this.x,this.y,74,this.width);
        else if(this.frameY === 3)    context3.drawImage(froggerSpriteDynamic3,0,0 ,74,54, this.x,this.y,74,this.width);
  
    }
}

const frogger = new Frogger(); //Vytvorenie konstanty frogger na zaklade class-y Frogger