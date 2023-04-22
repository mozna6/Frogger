//obstacles.js - subor, v ktorom pracujem s prekazkami - ich vykreslovanim a pod.

//Class obstacle - vsetky prekazky : auta, korytnacky, polena
class Obstacle{
    constructor(x,y,width,height,speed,type){
        this.x = x;         //Pozicia x 
        this.y = y;         //Pozicia y
        this.width = width;     //Sirka
        this.height = height;   //Vyska
        this.speed = speed;     //Rychlost
        this.type = type;       //Typ prekazky
        this.frameX = 0;       
        this.randomNumber = Math.floor(Math.random()*30 + 30);   //Nahodne cislo medzi 1 - 60
        this.carType = (Math.floor(Math.random()*3));   //Nahodne cislo medzi 1 - 3 - pre nahodny obrazok vozidla
    }
    
    //View
    //Metoda draw() - vykreslenie prekazok
    draw(){
        //Vykreslovanie pre korytnacky
        if(this.type === 'turtle'){     
            if (frame % this.randomNumber === 0){   //Animacia korytnacky v nahodnom case
                if(this.frameX >=1)                 //Menime frameX z 0 na 1 a naopak - animacia pohybu
                    this.frameX=0;
                else 
                    this.frameX++;
            }            
            context1.drawImage(turtle, this.frameX*71, 0, 72, 69, this.x, this.y, this.width, this.height); //Vykreslenie obrazku, korytnacky 
        }
        //Vykreslovanie pre polena
        else if(this.type === 'log'){  
            context1.drawImage(log, this.x,this.y,this.width,this.height);
        }
        //Vykreslovanie pre auta pohybujuce sa doprava
        else if(this.type === 'car' && this.speed >=0){    
            context2.drawImage(car, 0, this.carType * 68, 126 , 68, this.x , this.y, this.width, this.height);
        }
        //Vykreslovanie pre auta pohybujuce sa dolava
        else if(this.type === 'car' && this.speed < 0){    
            context2.drawImage(carReverse, 0, this.carType * 68, 126 , 68, this.x , this.y, this.width, this.height);
        }
           
    }

    //Model
    //Metoda update() - zabezpecuje pohyb prekazok
    update(){
        this.x += this.speed * gameSpeed;   //Pri kazdom skore sa rychlost zvysi
        if (this.speed > 0){    //Zistujeme, ci auto zmizlo na pravom okraji
            if (this.x > canvas1.width + this.width){   //Ak sa auto dostane za okraj obrazovky, objavi sa opat na druhej strane
                this.x = 0 - this.width;    //Neskorsie objavenie auta na druhej strane
                this.carType = (Math.floor(Math.random()*3)); //Za kazdym , ked auto prejde za okraj obrazovky - zmeni sa dizajn
            }
        } else {
            if (this.x < 0 - this.width){  //Zistujeme, ci auto zmizlo na lavom okraji
                this.x = canvas1.width + this.width;
                this.carType = (Math.floor(Math.random()*3));
            }
        }

    }
}

//Funkcia initObstacles - vytvorenie prekazok pre jednotlive "riadky"
function initObstacles(){
    //Street 1 - 4 - vytvaranie aut na ceste
    for (let i = 0; i < 2;i++){
        let x = i * 350;    //Horizontalna pozicia - medzery medzi autami
        carsArray.push(new Obstacle(x,canvas1.height - frogger.height*2  - 17-7, grid*2 , 82/1.4, 1, 'car')); //Prida novy prvok do pola - vlastnosti na zaklade blueprintu
    }
    for (let i = 0; i < 3;i++){
        let x = i * 300; 
        carsArray.push(new Obstacle(x,canvas1.height - frogger.height*3 - 34-9, grid*2 , 82/1.4, -1, 'car'));
    }
    for (let i = 0; i < 3;i++){
        let x = i * 300; 
        carsArray.push(new Obstacle(x,canvas1.height - frogger.height*4 - 45-13, grid*2 , 82/1.4, 1, 'car'));
    }
    for (let i = 0; i < 2;i++){
        let x = i * 370; 
        carsArray.push(new Obstacle(x,canvas1.height - frogger.height*5 - 60-18, grid*2 , 82/1.4, -1, 'car'));
    }
    
    //River 5 - 7 - vytvaranie korytnaciek a polien
    for (let i = 0; i < 2;i++){     //Polena
        let x = i * 370;
        logsArray.push(new Obstacle(x,canvas1.height - frogger.height*7 - 91-30, grid*2 , 82/1.4, -1, 'log'));
    }
    for (let i = 0; i < 4;i++){     //Korytnacky
        let x = i * 200;
        logsArray.push(new Obstacle(x,canvas1.height - frogger.height*8 - 40 - 102, grid , 82/1.4, 1.5, 'turtle'));
    }
    for (let i = 0; i < 3;i++){     //Polena
        let x = i * 250;
        logsArray.push(new Obstacle(x,canvas1.height - frogger.height*9 - 40 - 120, grid*2 , 82/1.4, -1.2, 'log'));
    }
    
}

initObstacles();    //Volame funkciu initObstacles() - naplnime polia pekazkami

//Funkcia handleObstacles() - prechadza celym car array a log array -> vykresluje auta, riadi ich pohyb a zistuje koliziu
function handleObstacles(){
    
    //Prechadzame car array
    for (let i = 0; i < carsArray.length; i++){
        carsArray[i].update();  //Volame metodu update() - pohyb
        carsArray[i].draw();    //Volame metodu draw() - zobrazenie   
    }

    //Prechadzame log array
    for (let i = 0; i < logsArray.length; i++){
        logsArray[i].update();  //Volame metodu update() - pohyb
        logsArray[i].draw();    //Volame metodu draw() - zobrazenie 
    }

    //Zistujeme, ci vznikla kolizia medzi zabou a autom - prechadzame poliami pre auta
    for (let i = 0; i < carsArray.length; i++){
        if(collision(frogger, carsArray[i])){   //Ak funkcia collision vrati true - vykresli sa obrazok zrazky a hra sa resetuje
            context3.clearRect(0,0,canvas1.width,canvas1.height);   //"Vycestenie" plochy
            frogger.draw();     //Vykreslenie zabu na pozicie zrazky
            frogger.update();   
            context3.drawImage(collisions,0,0,100,100,frogger.x,frogger.y,100,100); //Zobrazenie obrazku zrazky

            if (moving) {   //Kolizia pri pohybe
                crashSound.volume=soundTurnedOn;    //Zvukovy efekt zrazky
                crashSound.play();
                tmpX = frogger.x;   //Docasna pozicia X
                tmpY = frogger.y;   //Docasna pozicia Y
            }

            //setTimeout() - vykreslenie obrazku smrti az po urcitom case
            setTimeout(() => {
                frogger.frameX = 5; //Zmazanie obrazku zaby
                collisions.src = './img/death.png'; //Nastavime obrazok smrti
                context3.clearRect(0,0,canvas1.width,canvas1.height);
                context3.drawImage(collisions,0,0,100,100,tmpX,tmpY,100,100);   //Vykreslenie obrazku smrti
            }, 300);
            
            //Po urcitom case sa zavola funkcia resetGame() - nove spustenie hry
            if (moving) {
                setTimeout(() => {
                resetGame();
                }, 450);
            }
            moving = false;

        }
    }

    //Zistujeme, ci zaba skocila na poleno alebo korytnacku - prechadzame poliami pre polena a korytnacky
    if (frogger.y < 300 && frogger.y > 50){ //Zistujeme, ci sa zaba nachadza na rieke
        safe = false;
        
        for (let i = 0; i < logsArray.length; i++){
            if (collision(frogger, logsArray[i])){  //Volame funkciu collision - ak vrati true
                frogger.x += logsArray[i].speed*gameSpeed;    //x atribut zaby sa bude menit v zavislosti rychlosti objektu
                safe = true;    //Nastavime safe na hodnotu true - pohybujeme sa na polene/korytnacke
            }
        }


        if (!safe){     //Ak safe == false -> padli sme do vody
            context3.clearRect(0,0,canvas1.width,canvas1.height);
            frogger.draw();     //Vykreslenie zaby
            frogger.update();   
            context3.drawImage(splash,0,0,100,100,frogger.x,frogger.y,100,100); //Obrazok splechnutia
            frogger.frameX = 5;
            if (moving) {
                splashSound.volume=soundTurnedOn;
                splashSound.play();
                tmpX = frogger.x;
                tmpY = frogger.y;
            }
            setTimeout(() => {
                frogger.frameX = 5;
                splash.src = './img/death.png';
                context3.clearRect(0,0,canvas1.width,canvas1.height);
                context3.drawImage(splash,0,0,100,100,tmpX,tmpY,100,100);
            }, 300);
            
            if (moving) {
                setTimeout(() => {
                resetGame();
                }, 450);
            }
            moving = false;

        }
    }

}