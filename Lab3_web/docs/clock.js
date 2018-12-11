
var myModule =  (function () {

var set = []; 
var timerID = null;
var timerRunning = false;
var i = 0;
var bdy = document.querySelector('.body');
var setal = document.querySelector('.set_alert'); //set alert btn
var delal = document.querySelector('.delete_all');
var delth = document.querySelector('.delete_this');

var all = document.querySelector('.all');

fetch('http://localhost:3000/init')
    .then(res=>res.json())
    .then(d=>
    {
        set = d.data;
        i = d.i-1;
        ShowAll();
    });

function stopclock() {
    if (timerRunning) {
        clearTimeout(timerID);
    }
    timerRunning = false;
}

bdy.onload = function startclock() {
    stopclock();
    showtime();
};

function showtime() {
    var now = new Date();
    var days = now.getDate();
    var month = now.getMonth() + 1;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeValue = "" + ((hours > 12) ? hours - 12 : hours);
    timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
    timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
    timeValue += (hours >= 12) ? " PM" : " AM";
    timeValue += " " + days + "." + ((month < 10) ? "0" : "") + month;
    document.alert.time.value = timeValue;

    for (var k = 0; k <= i; k++) {
        if (timeValue == set[k]) {
            alert(timeValue + "\n Твоё время пришло");
        }
    }
    timerID = setTimeout(showtime, 1000);
    timerRunning = true;
}

setal.onclick = function setalert() {
    var valid = false;
    var six = 59;
    var tw = 12;
    var mon = 31;
    if (document.alert.time_01.value >= 00 && document.alert.time_01.value <= tw) {
        if (document.alert.time_02.value >= 00 && document.alert.time_02.value <= six) {
            if (document.alert.time_03.value >= 00 && document.alert.time_01.value <= six) {
                if (document.alert.time_04.value == "AM" || document.alert.time_04.value == "PM") {
                    if (document.alert.time_03.value >= 00 && document.alert.time_01.value <= tw) {
                        if (document.alert.time_03.value >= 00 && document.alert.time_01.value <= mon) {
                            valid = true;
                        }
                    }
                }
            }
        }
    }
    if (valid) {
        set[i] = document.alert.time_01.value;
        set[i] += ":" + document.alert.time_02.value;
        set[i] += ":" + document.alert.time_03.value;
        set[i] += " " + document.alert.time_04.value;
        set[i] += " " + document.alert.time_05.value;
        set[i] += "." + document.alert.time_06.value;
        ShowAll();
        if (set[i].length >= 15)
            if (set[i].length <= 17) {
                i++;
            }
           clockSync();
    } else {
        set[i] = "неверный формат ввода данных";
    }
};

function ShowAll() {
    if(!set[0])
        return;
    var all = set[0] + "\n";
    for (var k = 1; k < i; k++) {
        all += set[k] + "\n";
    }
    document.alert.all.value = all;
}

delth.onclick = function del() 
{
    var k = document.alert.bud.value;
    if (set.length >= k)
    {
    for (var l = k - 1; l < i; l++) 
    {
        set[l] = set[l + 1];
    }
    set[l-1] = " ";
    i--;
    set.length--; 
    }
    clockSync();
    ShowAll();
};

delal.onclick = function quit() {
    if (confirm("Сбросить все установки?")) {
        set = [];
        i = 0;
        clockSync();
        document.alert.all.value = ''
    }
};

function clockSync() {
    fetch('http://localhost:3000/api', {
        method: 'post',
        body: JSON.stringify({data: set, i:i}),
        headers: {'Content-Type': 'application/json'}
    })
}
    
})();