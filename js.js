//ducument variables area
document.body.addEventListener('mousedown',race_start);
const bulbs=document.getElementsByClassName('bulb');
const information_div=document.getElementById('your_time');
const timer1=document.getElementById('timer');
const score_board=document.getElementById('score_board');
const avr_time_html=document.getElementById('avr_time');
const best_time_html=document.getElementById("best_time");
const restart_button=document.getElementById('restart_button');
const all_container=document.getElementById('all_container');
const best_time_container=document.getElementById('best_time_container');
const avr_time_container=document.getElementById('avr_time_container');
const score_board_container=document.getElementById('score_board_container');
restart_button.addEventListener('click',restart);
document.body.addEventListener('keydown',space_check);
function space_check(event) {
    if (event.key === ' ' || event.code === 'Space') {
        race_start();
}}
window.addEventListener('resize',centering);
//variables area
let scores=[];
let avr_time_array=[];
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
centering()
function race_start() {
    const time_p=document.getElementById('your_time_p')
    //Show final time and end the counting
    if (is_timer_started) {
        //measure accurate time
        end_date=Date.now()-start_date;
        end_date_milliseconds=Number(String(end_date).slice(-3))
        if (end_date_milliseconds<100) {
            tmp3_avr_null='0';
        }else if (end_date_milliseconds<10) {
            tmp3_avr_null='00'
        }else{tmp3_avr_null=''}
        clearInterval(lights_time);
        information_div.classList.add('show_time');
        let tmp_final_time=tmp_null+minutes+':'+tmp2_null+seconds+':'+tmp3_null+end_date_milliseconds;
        console.log(tmp_final_time)
        time_p.innerText=tmp_final_time;
        score_board_f(tmp_final_time);
        timer1.innerText=tmp_final_time;
        avr_time_function();
        best_time_check();
        is_timer_started=false;
    }else{
        if (!is_lights_on) {
            //Returning variables to starting options
            starting_options()
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
//live timer
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
//check if localstorage is set at start
if ((localStorage.getItem('best_time'))!==null) {
    best_time_html.innerHTML="BEST TIME: "+return_timer_format(localStorage.getItem('best_time'));
}
//save best time in localstorage best time 
function best_time_check(){
    if ((localStorage.getItem('best_time'))==null) {
        localStorage.setItem('best_time',end_date);
    }
    if (end_date<=localStorage.getItem('best_time')) {
        localStorage.setItem('best_time',end_date);
        console.log('NEW BEST')
        best_time_html.innerHTML="BEST TIME: "+return_timer_format(end_date);
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
//displaying avr time upper the scoreboard
function avr_time_function() {
    avr_time_array.unshift(end_date)
    avr_time_array.sort();
    while (avr_time_array.length>=11) {
        avr_time_array.pop();
    }
    let avr_time=0
    let tmp_count_avr=0
    avr_time_array.forEach(element => {
        if (element!=="FALSTART") {
            avr_time+=Number(element);
            tmp_count_avr++
        }
    });
    avr_time=avr_time/(avr_time_array.length)
    avr_time=Math.round(avr_time)
    avr_time_html.innerHTML='AVR TIME: '+return_timer_format(avr_time)
}
//return proper time format
function return_timer_format(input) {
    let _milliseconds=String(input).slice(-3)
    let _minutes=Math.floor(Number(String(input).slice(0,-3))/60)
    let _seconds=Number(String(input).slice(0,-3))-(_minutes*60)
    let tmp1_null='';
    let tmp2_null='';
    let tmp3_null='';
    if (_minutes<10) {
        tmp1_null='0';
    }else{tmp1_null=''}
    if (_seconds<10) {
        tmp2_null='0';
    }else{tmp2_null=''}
    if (_milliseconds<100) {
        tmp3_null='0';
    }
    if (_milliseconds<10) {
        tmp3_null='00';
    }else{tmp3_null=''}
    return tmp1_null+_minutes+":"+tmp2_null+_seconds+":"+tmp3_null+_milliseconds;
}
//adjusting content
function centering() {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    all_container.style.width=x*2-20+'px';
    all_container.style.height=300+'px';
    if (x*2<791 && x*2>=428) {
        all_container.style.height=317+'px';
        best_time_container.style.top=337+'px';
        avr_time_container.style.top=397+'px';
        score_board_container.style.top=457+'px';
        information_div.style.top=294+'px';
        if (falstart_count!==3) {
            information_div.style.left=30+'%';
        }else{information_div.style.left=10+'%';}
        information_div.style.scale=0.5;
        information_div.style.border="10px solid rgb(202, 0, 0)";
        restart_button.style.left=43+'%'
        restart_button.style.top=385+'px'
    }else if(x*2<428){
        all_container.style.height=354+'px';
        best_time_container.style.top=374+'px';
        avr_time_container.style.top=434+'px';
        score_board_container.style.top=494+'px';
        information_div.style.top=331+'px';
        if (falstart_count!==3) {
            information_div.style.left=30+'%';
        }else{information_div.style.left=10+'%';}
        information_div.style.scale=0.5;
        information_div.style.border="10px solid rgb(202, 0, 0)";
        restart_button.style.left=43+'%'
        restart_button.style.top=423+'px'
    }else{
        all_container.style.height=280+'px';
        best_time_container.style.top=300+'px';
        avr_time_container.style.top=360+'px';
        score_board_container.style.top=420+'px';
        information_div.style.top=325+'px';
        if (falstart_count!==3) {
            information_div.style.left=x-155+'px';
        }else{information_div.style.left=x-205+'px';}
        information_div.style.scale=1;
        information_div.style.border="5px solid rgb(202, 0, 0)";
        restart_button.style.top=465+'px'
    }
    
}
//losing after 3 falstarts
function loser() {
    document.body.removeEventListener('keydown', space_check)
    document.body.removeEventListener('mousedown',race_start);
    information_div.style.width="420px";
    information_div.innerHTML="<p id='your_time_p'>YOU ARE LOSER</p>";
    restart_button.classList.add('show_time')
    centering()
}
//restart button function
function restart() {
    document.body.addEventListener('mousedown',race_start);
    document.body.addEventListener('keydown', space_check);
    document.querySelectorAll("li").forEach(li => {
        li.remove();
    });
    scores=[];
    avr_time_array=[];
    avr_time_html.innerHTML='AVR TIME: 00:00:000'
    falstart_count=0;
    starting_options();
}
//returning variables to starting values
function starting_options() {
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