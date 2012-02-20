/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/2/12
 * Time: 8:49 PM
 * To change this template use File | Settings | File Templates.
 */

var __timer = null;
var _stop = false;
var _sec = 0;
var _min = 0;
var _ttime = 0;


/**
 * the following function pads # < 10 with a 0
 * @param num
 */
function padZero(num) {
	return (num < 10) ? "0"+num : ""+num;
}

/**
 * the following function starts the timer
 */
function startTimer() {
    $.timer(1000, function(timer){
        if(_stop)
            timer.stop();

       updateTime();
    },'interval');
}

/**
 * the following gunction updates the timer
 */
function updateTime() {
    _sec += 1;
    _ttime += 1;
    if(_sec >= 60) {
        _sec = 0;
        _min += 1;
    }

    $('#timer').html(padZero(_min) + ':' + padZero(_sec));
}

function stopTimer() {
    _stop = true;
}