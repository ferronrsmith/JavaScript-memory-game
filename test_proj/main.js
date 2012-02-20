/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/2/12
 * Time: 8:49 PM
 * To change this template use File | Settings | File Templates.
 */

var __timer = null;
var _sec = 0;
var _min = 0;


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
    __timer = $.timer(1000, function(timer){
       updateTime();
    });
}

/**
 * the following gunction updates the timer
 */
function updateTime() {
    _sec += 1;
    if(_sec >= 60) {
        _sec = 0;
        _min += 1;
    }

    $('#timer').html(padZero(_min) + ':' + padZero(_sec));
}

/**
 * the following function stops the timer & reset the timer html
 */
function stopTimer() {
    if(__timer != null) {
        __timer.stop();
        __timer = null;
       _sec = 0;
       _min = 0;

        // reseet timer html
        $('#timer').html('00:00');
    }
}

function pauseTimer() {
    if(__timer != null) {
        __timer.stop();
        __timer = null;
      }
}

function ppTime() {
    $("#win").jqm().jqmShow();
}