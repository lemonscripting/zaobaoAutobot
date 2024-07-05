// ==UserScript==
// @name         ZBA - alpha
// @namespace    https://www.zbschools.sg/
// @version      0.1
// @description  ZBA - alpha
// @match        https://www.zbschools.sg/*
// @grant        none
// ==/UserScript==

var dict =
[
    ["https://www.zbschools.sg/cos/o.x?c=/ca7_zbs/zbs&func=quiz&tid=1&rid=29878", [
        'input[type="radio"][name="resp[293764]"][value="D"]',
        'input[type="radio"][name="resp[293765]"][value="D"]',
        'input[type="radio"][name="resp[293766]"][value="A"]',
        'input[type="radio"][name="resp[293767]"][value="C"]'
    ]],

    ["https://www.zbschools.sg/cos/o.x?c=/ca7_zbs/zbs&func=quiz&tid=1&rid=29876", [
        'input[type="radio"][name="resp[293759]"][value="D"]',
        'input[type="radio"][name="resp[293760]"][value="D"]',
        'input[type="radio"][name="resp[293761]"][value="D"]',
        'input[type="radio"][name="resp[293762]"][value="D"]'
    ]],

    ["https://www.zbschools.sg/cos/o.x?c=/ca7_zbs/zbs&func=quiz&tid=1&rid=29880", [
        'input[type="radio"][name="resp[293782]"][value="D"]',
        'input[type="radio"][name="resp[293783]"][value="D"]',
        'input[type="radio"][name="resp[293784]"][value="B"]',
        'input[type="radio"][name="resp[293785]"][value="D"]'
    ]]
];


//init
if (localStorage.getItem('base') === null) {
    localStorage.setItem('base', 0);
    var target = prompt("how many points do you want [in hundreds]");
    localStorage.setItem('target', target/100);
}


var count = localStorage.getItem('base');

var ifReach = localStorage.getItem('target');
if (ifReach < count){
    main();
}
function main(){
var current_dict = dict[count][1];

function checkRadioButton(resp) {
    const radioButton = document.querySelector(resp);
    if (radioButton) {
        radioButton.checked = true;
        console.log('Radio button checked successfully.');
    } else {
        console.log('Radio button not found.');
    }
}

for (var i = 0; i < current_dict.length; i++) {
    checkRadioButton(current_dict[i]);
}

localStorage.setItem('base', count+=1);

var submit = document.querySelector('.btn.btn-default.btn-submit');
if (submit) {
    submit.click();
} else {
    console.error('Button not found.');
}
}