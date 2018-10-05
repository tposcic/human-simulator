//liftoff
const life = function(){

    const theLiving = [];
    const theDead = [];
    
    //give birth to humoons
    for(let i=0; i<Math.random()*10; i++){
        let human = new Human;
        theLiving.push(human);
    }
    
    let day = document.querySelector('#day');
    let year = document.querySelector('#year')
    let living = document.querySelector('#living');
    let dead = document.querySelector('#dead');

    /**
     * THE LOOP OF LIFE
     */
    let currentDay = 1;//day
    //1 day = 100ms
    let time = setInterval(function(){
        if(currentDay == 36500){
            console.log(currentDay);
            clearInterval(time);
        }

        theLiving.forEach(human => {
            if(human.alive){
                human.croak();
                //we need to feed them a bit more
                if(human.getBMR() > 2200){
                    human.eat(Math.floor(Math.random() * (3500 - 2500 + 1)) + 2500);
                } else {
                    human.eat(Math.floor(Math.random() * (2200 - 500 + 1)) + 2200);
                }

                human.sleep();
                human.poop();
                human.tick();
            } else {
                //we have to burry the creature
                theLiving.splice( theLiving.indexOf(human), 1 );
                theDead.push(human);
            }
        });
        currentDay++;

        day.innerHTML = currentDay;
        year.innerHTML  = Math.ceil(currentDay/365);
        living.innerHTML = humansToHTML(theLiving);
        dead.innerHTML  = humansToHTML(theDead);
    }, 1);
    /**
     * END THE LOOP OF LIFE
     */
}

const humansToHTML = function(humans){
    let html = '';

    //move this to spawn and change them via id's
    humans.forEach(human => {
        html += 
        '<div class="human">'+
            '<h3>'+human.name+'</h3>'+
            '<div class="age"><span class="name">Age: </span><span class="value">'+(Math.ceil(human.age/365))+'</span></div>'+
            '<div class="health"><span class="name">Health: </span><span class="value">'+human.health+'</span></div>'+
            '<div class="weight"><span class="name">Weight: </span><span class="value">'+human.weight+'</span></div>'+
            '<div class="height"><span class="name">Height: </span><span class="value">'+human.height+'</span></div>'+
        '</div>'
    });

    return html;
}

document.addEventListener('DOMContentLoaded', function(){ 
    //run life
    life();
}, false);