var set = [];
var timerID = null;
var timerRunning = false;
var i = 0;

function stopclock()
{
    if (timerRunning)
    {
        clearTimeout(timerID);
    }   
    timerRunning = false;
}
function startclock()
{
    stopclock();
    showtime();
}
function showtime()
{
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
    for (var k = 0; k <= i; k++)
    if (timeValue == set[k])
    {
        alert(timeValue + "\n Твоё время пришло");
    }
    timerID = setTimeout("showtime()", 1000);
    timerRunning = true;
}
function setalert()
{
    //set[i] = prompt("Установка времени напоминания.\nВведите время в формате 0:00:00 AM 29.09. Например 11:01:00 AM 18.10","11:11:11 AM 29.09");
    set[i] = document.alert.time_01.value;
    set[i] += ":" + document.alert.time_02.value;
    set[i] += ":" + document.alert.time_03.value;
    set[i] += " " + document.alert.time_04.value;
    set[i] += " " + document.alert.time_05.value;
    set[i] += "." + document.alert.time_06.value;
    ShowAll();
    if (set[i].length >= 16)
    if (set[i].length <= 17)
        {
            i++;
        }
        else
        {
            set[i] = "неверный формат ввода данных";
        }

}
//function ValidDate(Data)
//{
//    var example ="^[0-9]{2}+:+[0-9]{2}+:+[0-9]{2}+ +[PpMmAa]{2}+ +[0-9]{2}.+[0-9]{2}$";
//    var valid = example.test(Data);
//    if (valid)
//    {
//        output = '!';
//    }
//    else
//    {
//        output = '';
//    }
//    document.getElementById('message').innerHTML = document.getElementById('message').innerHTML + '<br />' + output;
//    return valid;
//} 
function ShowAll()
{
    var all = set[0] + "\n";
    for (var k = 1; k <= i; k++)
    {
        all += set[k] + "\n";
    }
    document.alert.all.value = all;
}
function quit()
{
    if (confirm("Сбросить все установки?"))
    {
        location.reload();
    }
}