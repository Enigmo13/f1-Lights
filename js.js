document.body.addEventListener('mousedown',race_start);
const time_p=document.getElementById('your_time_p')
let show_time=document.getElementById('your_time');
let timer1=document.getElementById('timer');
document.body.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.code === 'Space') {
        race_start();
}})
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
show_time.style.left=(x-150)+'px';
show_time.style.top=(y-75)+'px';
window.addEventListener('resize',()=>{          //div position chanmge
    console.log('resize')
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    show_time.style.left=(x-150)+'px';
    show_time.style.top=(y-75)+'px';
})
let is_timer_started=false;
let is_lights_on=false;
let lights_time=0;
let milliseconds=0;
let seconds=0;
let minutes=0;
var tmp_null=0;
var tmp2_null=0;
var tmp3_null=0;
var falstart=0;
function race_start() {
    let bulbs=document.getElementsByClassName('bulb');
    timer1.classList.remove('falstart');
    if (is_timer_started) {
        clearInterval(lights_time);
        show_time.classList.add('show_time');
        time_p.innerText=tmp_null+minutes+':'+tmp2_null+seconds+':'+tmp3_null+milliseconds;
        is_timer_started=false;
    }else{
        if (!is_lights_on) {
            for (let i = 0; i < bulbs.length; i++) {        //
                bulbs[i].classList.remove('red_light');     //początkowe gaszenie świateł
            }                                               //
            falstart=0;
            timer1.innerText="TIME: 00:00:00";    //ustawienie timera
            show_time.classList.remove('show_time');                        //ustawienie pojemnika z wynikiem 
            is_lights_on=true
            let tmp_bulb=0;
            var red_lights=setInterval(() => {
            if (falstart) {                                 //
                console.log('fal1')                         //2 falstart check
                clearInterval(red_lights);                  //
                is_lights_on=false;
                return;
            }else{
                bulbs[tmp_bulb].classList.toggle('red_light')   //zapalanie świteł
            tmp_bulb++;
            }
            if (tmp_bulb==5) {
                clearInterval(red_lights);
                milliseconds=0;
                seconds=0;
                minutes=0;
                let random_time=(Math.floor(Math.random() * (300 - 100 + 1)) + 100) //losowanie czasu 1-3s
                console.log(random_time)
                let tmp_count1=0;
                const random_time_interv=setInterval(() => {
                        tmp_count1++
                        if (!falstart) {
                            if (tmp_count1>random_time) {               //akcja po przekroczeniu zadanego randomowego czasu
                            clearInterval(random_time_interv);          //
                            for (let i = 0; i < bulbs.length; i++) {
                                bulbs[i].classList.remove('red_light'); //gaszenie świateł
                            }
                            is_lights_on=false;
                            clearInterval(red_lights);
                            lights_time=setInterval(timer_update,10);  //załączanie stopera
                            is_timer_started=true;
                            return;
                        }
                        
                    }else{
                        clearInterval(random_time_interv);          //3 falstart check
                        console.log('fal2')
                        is_lights_on=false;
                    }
                }, 10);
                
            }
        }, 1000);
        }else{
            falstart=true;                                          //1 falstart check
            timer1.innerText="X_X";
            timer1.classList.add('falstart');
            time_p.innerHTML="FALSTART";
            show_time.classList.add('show_time');
            return;
        }
    }
}
function timer_update() {
    if (!falstart) {
       milliseconds++;
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
        }else{tmp3_null=''}
        timer1.innerText="TIME: "+tmp_null+minutes+':'+tmp2_null+seconds+':'+tmp3_null+milliseconds; 
    }else{
        return;
    }
    
}