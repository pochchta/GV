// ==UserScript==
// @name GODville-script
// @description Мой самый первый юзерскрипт
// @author Vasya Pupkin
// @license MIT
// @version 1.0
// @include https://godville.net/superhero
// ==/UserScript==

var delay_counter = 0;
const DELAY_SET = 10;

const HEALTH_SET = 30, MONEY_SET = 1500;
var arr = {
  //[название], [подпись], [значение],
   TIME: ["Прошло времени", "создан", "таймер между событиями"],
   KILL: ["Убийств", "было", "стало"],
   EXP: ["Опыт", "было", "стало"],
   TASK: ["Задание", "было", "стало"],
   HEALTH: ["Здоровье", "отсечка " + HEALTH_SET, ""],
   PRANA: ["Прана", "зарядов", ""],
   GOLD: ["Денег", "отсечка " + MONEY_SET, ""],
   //ARENA: ["На арену", "возможность отправки", ""]
};
var hero = {};

function get_value_idcn(id, cn){
    return (document.getElementById(id).getElementsByClassName(cn) )[0].innerHTML;
}
function get_title_idcn(id, cn){
    return (document.getElementById(id).getElementsByClassName(cn) )[0].getAttribute("title");
}
function get_elem_idcn(id, cn){
    return (document.getElementById(id).getElementsByClassName(cn) )[0];
}

var click_state = 0;
function inic(){
    if ( ! document.getElementById("my_test_block") ) {
        var new_Date = new Date();
        arr.TIME[1] = new_Date.getHours() + ":" + new_Date.getMinutes() + ":" + new_Date.getSeconds() + " - (" + new_Date.getDate() + "." + (+new_Date.getMonth()+1) +")";
        arr.KILL[1] = get_value_idcn("hk_monsters_killed", "l_val");
        arr.EXP[1] = Number(get_title_idcn("hk_level", "p_bar").replace(/\D+/g,"")) + "%";
        arr.TASK[1] = Number(get_title_idcn("hk_quests_completed", "p_bar").replace(/\D+/g,"")) + "%";

        var div_block = document.createElement('div'), div_block_content = document.createElement('div'), div_block_end_line = document.createElement('div');
        var div_equ = document.getElementById("equipment");
        var div_equ_block_h = div_equ.getElementsByClassName("block_h")[0];
        var div_equ_line = div_equ.getElementsByClassName("line");
        div_block.id = "my_test_block";
        div_block.className = "block";
        var div_block_h = div_equ_block_h.cloneNode(true);

        div_block_h.onclick = function(){
            click_state = click_state ^ 1;
            if ( click_state && get_elem_idcn("my_test_block", "block_title") ) {
                get_elem_idcn("my_test_block", "block_title").style.color = "red";
            } else {
                get_elem_idcn("my_test_block", "block_title").style.color = "";
            }
        };

        (div_block_h.getElementsByClassName("block_title"))[0].innerHTML = "My_test_block ))";
        div_block.appendChild(div_block_h);
        div_block.appendChild(div_block_content);
        div_block_content.className = "block_content";
        div_block_end_line.className = "line";

        var div_block_line = [], i = 0;
        for (var key in arr) {
            div_block_line[i] = div_equ_line[0].cloneNode(true);
            div_block_line[i].id = "my_line_" + i;
            ( div_block_line[i].getElementsByClassName("eq_capt") )[0].innerHTML = arr[key][0];
            ( div_block_line[i].getElementsByClassName("eq_name") )[0].innerHTML = arr[key][1];
            ( div_block_line[i].getElementsByClassName("eq_level") )[0].innerHTML = arr[key][2];
            div_block_content.appendChild(div_block_line[i]);
            i++;
        };

        div_block_content.appendChild(div_block_end_line);
        document.getElementById("left_block").insertBefore( div_block , document.getElementById("pet") );

    }
}

function loop(){
    inic();

    var new_Date = new Date();
    arr.TIME[0] = new_Date.getHours() + ":" + new_Date.getMinutes() + ":" + new_Date.getSeconds() + " - (" + new_Date.getDate() + "." + (+new_Date.getMonth()+1) + ")" ;
    arr.TIME[2] = delay_counter;
    arr.HEALTH[2] = get_value_idcn("hk_health", "l_val");
    arr.HEALTH[2] = arr.HEALTH[2].substring( 0 , arr.HEALTH[2].indexOf("/") - 1 );
    hero.health = +arr.HEALTH[2];
    arr.PRANA[2] = get_value_idcn("cntrl", "gp_val");
    arr.PRANA[2] = arr.PRANA[2].slice( 0 , -1 );
    hero.prana = +arr.PRANA[2];
    arr.PRANA[1] = get_value_idcn("cntrl", "acc_val");
    hero.acc = +arr.PRANA[1];
    arr.PRANA[1] = "аккумулятор: " + arr.PRANA[1];
    arr.GOLD[2] = get_value_idcn("hk_gold_we", "l_val");
    arr.GOLD[2] = Number(arr.GOLD[2].replace(/\D+/g,""));
    hero.gold = +arr.GOLD[2];
    arr.KILL[2] = get_value_idcn("hk_monsters_killed", "l_val");
    arr.EXP[2] = Number(get_title_idcn("hk_level", "p_bar").replace(/\D+/g,"")) + "%";
    arr.TASK[2] = Number(get_title_idcn("hk_quests_completed", "p_bar").replace(/\D+/g,"")) + "%";

    //----------------------
    // prana_auto_charge
    if (click_state && (delay_counter >= DELAY_SET)) {
        if ( get_elem_idcn("acc_links_wrap", "ch_link") && (hero.acc < 3) && (hero.prana == 100) ){
            delay_counter = 0;
            get_elem_idcn("acc_links_wrap", "ch_link").click();
            //alert("Проверка связи");
        }
    }
    //-----------------------

    var div_block_line, i = 0;
    for(var key in arr) {
        div_block_line = document.getElementById("my_line_" + i);
        if ( ( div_block_line.getElementsByClassName("eq_capt") )[0].innerHTML != arr[key][0] ) ( div_block_line.getElementsByClassName("eq_capt") )[0].innerHTML = arr[key][0];
        if ( ( div_block_line.getElementsByClassName("eq_name") )[0].innerHTML != arr[key][1] ) ( div_block_line.getElementsByClassName("eq_name") )[0].innerHTML = arr[key][1];
        if ( ( div_block_line.getElementsByClassName("eq_level") )[0].innerHTML != arr[key][2] ) ( div_block_line.getElementsByClassName("eq_level") )[0].innerHTML = arr[key][2];
        i++;
    };

    if (delay_counter < DELAY_SET) delay_counter++;
}
var delay_id = setInterval(loop, 1000);