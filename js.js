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

function inic(){
    if ( ! document.getElementById("my_test_block") ) {
        var div_block = document.createElement('div'), div_block_content = document.createElement('div'), div_block_end_line = document.createElement('div');
        var div_equ = document.getElementById("equipment");
        var div_equ_block_h = div_equ.getElementsByClassName("block_h");
        var div_equ_line = div_equ.getElementsByClassName("line");
        div_block.id = "my_test_block";
        div_block.className = "block";
        var div_block_h = div_equ_block_h[0].cloneNode(true);
        (div_block_h.getElementsByClassName("block_title"))[0].innerHTML = "My_test_block ))";

        div_block_content.className = "block_content";
        var div_block_line = div_equ_line[0].cloneNode(true);
        div_block_line.id = "my_line_0";
        ( div_block_line.getElementsByClassName("eq_name") )[0].innerHTML = "--------------------";
        div_block_end_line.className = "line";

        document.getElementById("left_block").insertBefore( div_block , document.getElementById("pet") );
        div_block.appendChild(div_block_h);
        div_block.appendChild(div_block_content);
        div_block_content.appendChild(div_block_line);
        div_block_content.appendChild(div_block_line.cloneNode(true));
        div_block_content.appendChild(div_block_end_line);
    }
}

function loop(){
    inic();
    new_Date = new Date();

    //alert(new_Date.getSeconds());
    delay_counter++;
    if (delay_counter > DELAY_SET) delay_counter = 0;
}
var delay_id = setInterval(loop, 1000);
//document.addEventListener('DOMNodeInserted', change);