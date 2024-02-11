document.body.addEventListener('mousedown',race_start);
const bulbs=document.getElementsByClassName('bulb');
const information_div=document.getElementById('your_time');
const timer1=document.getElementById('timer');
const score_board=document.getElementById('score_board');
const restart_button=document.getElementById('restart_button');
restart_button.addEventListener('click',restart);
document.body.addEventListener('keydown',space_check)
function space_check(event) {
    if (event.key === ' ' || event.code === 'Space') {
        race_start();
}}
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
information_div.style.left=(x-155)+'px';
information_div.style.top=(y-75)+'px';
restart_button.style.left=(x-85)+'px';
restart_button.style.top=(y+75)+'px';
window.addEventListener('resize',centering);
let scores=[];
let is_timer_started=false;
let is_lights_on=false;
let lights_time=0;
let milliseconds=0;
let all_miliseconds=0;
let seconds=0;
let minutes=0;
let tmp_null=0;
let tmp2_null=0;
let tmp3_null=0;
let falstart=0;
let falstart_count=0;
let tmp_additional_clicks=0;
let start_date=0;
let end_date=0;
function race_start() {
    const time_p=document.getElementById('your_time_p')
    //Show final time and end the counting
    if (is_timer_started) {
        //measure accurate time
        end_date=Date.now()-start_date;
        clearInterval(lights_time);
        information_div.classList.add('show_time');
        end_date=String(end_date).slice(-3.-1)
        let tmp_final_time=tmp_null+minutes+':'+tmp2_null+seconds+':'+tmp3_null+end_date;
        console.log(tmp_final_time)
        time_p.innerText=tmp_final_time;
        score_board_f(tmp_final_time);
        is_timer_started=false;
    }else{
        if (!is_lights_on) {
            //Returning things to factory options
            factory_options()
            is_lights_on=true
            let tmp_bulb=0;
            var red_lights=setInterval(() => {
            //Second falstart check
            if (falstart) {
                clearInterval(red_lights);
                is_lights_on=false;
                return;
            }else{
                //turnig on the lights
                bulbs[tmp_bulb].classList.toggle('red_light')
            tmp_bulb++;
            }
            if (tmp_bulb==5) {
                clearInterval(red_lights);
                milliseconds=0;
                seconds=0;
                minutes=0;
                //randomizing time between 1 and 3 sec
                let random_time=(Math.floor(Math.random() * (300 - 100 + 1)) + 100)
                console.log(random_time)
                let tmp_count1=0;
                const random_time_interv=setInterval(() => {
                        tmp_count1++
                        if (!falstart) {
                            //checking if random time ends
                            if (tmp_count1>random_time) {
                            start_date=Date.now();
                            clearInterval(random_time_interv);
                            //turning off the lights
                            for (let i = 0; i < bulbs.length; i++) {
                                bulbs[i].classList.remove('red_light');
                            }
                            is_lights_on=false;
                            clearInterval(red_lights);
                            //turning on the stoper
                            lights_time=setInterval(timer_update,10);
                            is_timer_started=true;
                            return;
                        }
                        }else{
                            //third fallstart check
                            clearInterval(random_time_interv);
                            console.log('fal2')
                            is_lights_on=false;
                    }
                }, 10);
            }
        }, 1000);
        }else{
            //First falstart check
            if (tmp_additional_clicks<1) {
                falstart_count++;
                score_board_f('FALSTART');
                if (falstart_count>=3) {
                    loser();
                }
            }
            tmp_additional_clicks++
            falstart=true;
            timer1.innerText="X_X";
            timer1.classList.add('falstart');
            time_p.innerHTML="FALSTART";
            information_div.classList.add('show_time');
            return;
        }
    }
}
function timer_update() {
    if (!falstart) {
       milliseconds++;
       all_miliseconds++;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
        }
        if (minutes<10) {
            tmp_null='0';
        }else{tmp_null=''}
        if (seconds<10) {
            tmp2_null='0';
        }else{tmp2_null=''}
        if (milliseconds<10) {
            tmp3_null='0';
        }else if (milliseconds==0) {
            tmp3_null='00'
        }else{tmp3_null=''}
        timer1.innerText="TIME: "+tmp_null+minutes+':'+tmp2_null+seconds+':'+tmp3_null+milliseconds;
    }else{
        return;
    }
    
}
//score board controll
function score_board_f(final) {
    scores.unshift(final)
    document.querySelectorAll("li").forEach(li => {
        li.remove();
    });
    scores.sort();
    //setting max scores on scoreboard to 10
    while (scores.length>=11) {
        scores.pop();
    }
    scores.forEach(element => {
        let score_element = document.createElement("li");
        score_element.innerHTML=element;
        score_board.appendChild(score_element);
    });
}
//centering information_div and restart_button
function centering() {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    if (falstart_count!==3) {
        information_div.style.left=(x-150)+'px';
    }else{information_div.style.left=(x-200)+'px';}
    information_div.style.top=(y-75)+'px';
    restart_button.style.left=(x-85)+'px';
    restart_button.style.top=(y+75)+'px';
}
//losing after 3 falstarts
function loser() {
    document.body.removeEventListener('keydown', space_check)
    document.body.removeEventListener('mousedown',race_start);
    information_div.style.width="400px";
    information_div.innerHTML="<p id='your_time_p'>PRZEGRAŁEŚ</p>";
    information_div.style.left=(x-205)+'px';
    restart_button.classList.add('show_time')
}
//restart button function
function restart() {
    document.body.addEventListener('mousedown',race_start);
    document.body.addEventListener('keydown', space_check);
    document.querySelectorAll("li").forEach(li => {
        li.remove();
    });
    scores=[];
    falstart_count=0;
    factory_options();
}
//returning everything to factoryoptions
function factory_options() {
    //hiding the information div
    information_div.classList.remove('show_time');
    information_div.style.width="300px";
    centering();
    //hiding the restart_button
    restart_button.classList.remove('show_time'); 
    timer1.classList.remove('falstart');
    //set timer to base value
    timer1.innerText="TIME: 00:00:00";
    //lights off
    for (let i = 0; i < bulbs.length; i++) {
        bulbs[i].classList.remove('red_light');
    }
    falstart=0;
    tmp_additional_clicks=0;
}