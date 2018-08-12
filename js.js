// ==UserScript==
// @name GODville-script
// @description Мой самый первый юзерскрипт
// @author Vasya Pupkin
// @license MIT
// @version 1.0
// @include https://godville.net/superhero
// ==/UserScript==

var delay_counter = 0;
var new_Date;
//var last_id;
const DELAY_SET = 60;
/*
function change(){
    if (delay_counter > DELAY_SET){
        //alert(delay_counter);
        if (last_id != document.getElementsByClassName('orderOther')[0].getAttribute('orderid')){
            new Audio('https://sound-pack.net/audio/sfx/94/windows_2000_notify.mp3').play();
        }
        last_id = document.getElementsByClassName('orderOther')[0].getAttribute('orderid');
    }
}
*/

const health_set = 30, prana_set = 30;
var arr = [
    ["Время", "00:01:02", ""],
    ["Создан", "00:01:02", ""],
    ["Здоровье", "отсечка " + health_set, "0"],
    ["Прана", "отсечка " + prana_set, "0"],
    ["На арену", "возможность отправки", "0"]
];

function inic(){
    if ( ! document.getElementById("my_test_block") ) {
        new_Date = new Date();
        arr[1][1] = new_Date.getHours() + ":" + new_Date.getMinutes() + ":" + new_Date.getSeconds();

        var div_block = document.createElement('div'), div_block_content = document.createElement('div'), div_block_end_line = document.createElement('div');
        var div_equ = document.getElementById("equipment");
        var div_equ_block_h = div_equ.getElementsByClassName("block_h");
        var div_equ_line = div_equ.getElementsByClassName("line");
        div_block.id = "my_test_block";
        div_block.className = "block";
        var div_block_h = div_equ_block_h[0].cloneNode(true);
        (div_block_h.getElementsByClassName("block_title"))[0].innerHTML = "My_test_block ))";
        div_block.appendChild(div_block_h);
        div_block.appendChild(div_block_content);
        div_block_content.className = "block_content";
        div_block_end_line.className = "line";

        var div_block_line = [];
        arr.forEach(function(item, i, arr) {
            div_block_line[i] = div_equ_line[0].cloneNode(true);
            div_block_line[i].id = "my_line_" + i;
            ( div_block_line[i].getElementsByClassName("eq_capt") )[0].innerHTML = item[0];
            ( div_block_line[i].getElementsByClassName("eq_name") )[0].innerHTML = item[1];
            ( div_block_line[i].getElementsByClassName("eq_level") )[0].innerHTML = item[2];
            div_block_content.appendChild(div_block_line[i]);
        });

        div_block_content.appendChild(div_block_end_line);
        document.getElementById("left_block").insertBefore( div_block , document.getElementById("pet") );

    }
}

function loop(){
    inic();

    new_Date = new Date();
    arr[0][1] = new_Date.getHours() + ":" + new_Date.getMinutes() + ":" + new_Date.getSeconds();

    var div_block_line;
    arr.forEach(function(item, i, arr) {
        div_block_line = document.getElementById("my_line_" + i);
        ( div_block_line.getElementsByClassName("eq_name") )[0].innerHTML = item[1];
        ( div_block_line.getElementsByClassName("eq_level") )[0].innerHTML = item[2];
    });


    delay_counter++;
    if (delay_counter > DELAY_SET) delay_counter = 0;
}
var delay_id = setInterval(loop, 1000);
//document.addEventListener('DOMNodeInserted', change);