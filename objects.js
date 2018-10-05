//declare constants
const deseaseTypes = {
    plague:{
        severity: 100
    },
    cold:{
        severity: 5
    },
    flu:{
        severity: 15
    },
    cancer:{
        severity: 95
    }
};

const genders = ['male', 'female'];
const maleNames = ['John', 'Andrew', 'Howard'];
const femaleNames = ['Priscilla', 'Jennifer', 'Anna'];

//setup classes
class Human{
    // a human is born
    constructor() {
        this.alive = true; //quite important
        this.name = '';
        this.age = 1; //days
        this.health = 100; //decreases if your shit gets fucked
        this.weight = Math.floor(Math.random() * (3.5 - 2.5 + 1)) + 2.5; //kg
        this.nutrition = 0;
        this.bloodVolume = 0.2; //in liters
        this.height = 50; //cm
        this.gender = genders[Math.floor(Math.random()*genders.length)]; //2
        this.diseases = [];
        this.characteristics = [];

        if(this.gender == 'male'){
            this.name = maleNames[Math.floor(Math.random()*maleNames.length)];
        } else {
            this.name = femaleNames[Math.floor(Math.random()*femaleNames.length)];
        }
    }

    /**
     * We eat something, the value is in calories
     * @param {Number} nutritionalValue 
     */
    eat(nutritionalValue){
        this.nutrition += nutritionalValue;
    }

    /**
     * calculate some stuff on sleep
     */
    sleep(){
        let bmr = this.getBMR();

        if(this.nutrition > bmr*1.76+500){
            this.weight += 0.05;
        } else if(this.nutrition < bmr*1.76-500){
            this.weight -= 0.05;
        }

        if(this.nutrition == 0){
            this.weight -= 0.5;
            this.health -= 0.1;
        }

        this.nutrition = 0;
    }

    /**
     * pooping and peeing
     */
    poop(){

    }

    /**
     * After a day passes we do some calculations
     */
    tick(){
        //calculate height growth -> do more research on this
        if(this.age < 10*365){
            this.height += 0.010+Math.random()*0.01;
        } else if (this.age > 10*365 && this.age < 16*365){
            this.height += 0.035+Math.random()*0.01;
        }

        this.bloodVolume = this.getBloodVolume();
        this.age++;
    }

    /**
     * death can happen any time
     */
    croak(){       
        if(this.health < 100 && this.age <= 30*365){
            this.alive = Math.random() < 0.999999;
        }
        if(this.health < 10 && this.age <= 70*365){
            this.alive = Math.random() < 0.9;
        }
        if(this.age > 70*365 && this.health < 30){
            this.alive = Math.random() >= 0.5;
        }
        if(this.age > 80*365 && this.health < 60){
            this.alive = Math.random() >= 0.5;
        }
        if(this.age > 85*365 && this.health < 80){
            this.alive = Math.random() >= 0.5;
        }
        if(this.age > 90*365 && this.health < 90){
            this.alive = Math.random() >= 0.5;
        }
        if(this.age > 95*365 && this.health < 100){
            this.alive = Math.random() < 0.999;
        }
    }

    /**
     * Get the humans BMR depending on the gender
     * https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
     */
    getBMR(){
        if(this.gender === 'male'){
            return (10*this.weight)+(6.25*this.height)-(5*Math.ceil(this.age/365))+5;
        } else {
            return (10*this.weight)+(6.25*this.height)-(5*Math.ceil(this.age/365))+161;
        }
    }

    /**
     * get the current blood volume in a human -> this is completely wrong
     * https://www.wikihow.com/Calculate-Blood-Volume
     */
    getBloodVolume(){
        if(this.gender === 'male'){
            return this.weight * 70;
        } else {
            return this.weight * 65;
        }
    }
}
