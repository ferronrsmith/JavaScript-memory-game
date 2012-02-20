/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 12/30/11
 * Time: 9:08 PM
 * To change this template use File | Settings | File Templates.
 */

//global variables
//var startTime = new Date().getTime();
var dir = "/memo_test/backend/";
var host = getURL() + dir;
var gameType = 'memo';


/**
 * the following function gets the direct url for the link
 */
function getURL() {
    var local = document.location;
    return local.protocol + "//" + local.host;
}

function memotest(i, imagen) {

    if(_ttime == 0)
        startTimer();

    if ($(".s-" + imagen).hasClass('seleccionada')) {
        // Si ya hay una imagen del par ya seleccionada (o sea, elige la 2da correctamente)
        $(".c-" + imagen).removeClass("abierto"); // Quitamos el cover del Bg, para mostrar la ficha
        $(".s-" + imagen).addClass("encontrada"); // se marca el div de la ficha como encontrada
        $(".c-" + imagen).addClass("trabado");
        var w = $(".encontrada");

        // Congratulation message / Mensaje de felicitacion.
        if (w.length == 36) {
            $.timer(600, function (timer) {
                stopTimer();
                $("#win").jqm().jqmShow();
                timer.stop();
            });
        }
    } else if ($(".ficha-cover").hasClass("abierto")) {
        // Si no hay coincidencia, y hay alguna abierta:
        $("#s-" + i).addClass("seleccionada"); // for the record... / lo grabamos.
        $("#c-" + i).addClass("abierto"); // display:none;

        // if no coincidence, hide items after 400ms / Si no acierta, espera 400ms para ocultar la ficha
        $.timer(400, function (timer) {

            $(".ficha").removeClass("seleccionada"); // not selected anymore / ya no esta seleccionada.
            $(".ficha-cover").removeClass("abierto"); // chau display:none;

            timer.stop();
        });
    } else {
        // Si elige la primer ficha (de dos)
        $("#s-" + i).addClass("seleccionada"); // for the record... / lo grabamos.
        $("#c-" + i).addClass("abierto"); // display:none;
    }
}

/**
 * Save Game Time to the database
 */
function saveTime() {
    var username = $("#username").val();
    logScore(username, _ttime);
}

/**
 * the following function persist player score
 * @param name - player name
 * @param time - player time
 */
function logScore(name, time) {

    var url = host + "LogScore.php";

    $.ajax({
        type:"GET",
        url:url, //?playername=kira&timetaken=5'
        data:"playername=" + name + "&timetaken=" + time + "&type=" + gameType,
        async:false,
        success:function () {
            //reload page to start a new game
            document.location.reload();
        },
        error:function () {
            console.log("could not be logged");
        }

    });
}

/**
 * Retrieve top 10 scores from server
 */
function getTopTenScores() {
    var url = host + "TopPlayers.php?type="+gameType;
    getPlayerData(url);
}

/**
 * Retrieve all scores from server
 */
function getLeaderBoard() {
    var url = host + "LeaderBoard.php?type="+gameType;
    getPlayerData(url);
}

/**
 * The following function retrieve player data and append it to the table view
 * @param url
 */
function getPlayerData(url) {
    console.log(url);
    $.getJSON(url, function (data) {
        if (data) { //check if any data is returned
            $.each(data, function (key, val) {
                $("#tbBody").append('<tr>' +
                    '<td><i>' + val.name + '</i></td>' +
                    '<td>' + time_formatter(val.time) + '</td>' +
                    '</tr>');
            });
        }
        else {
            console.log("Aw Snap! : Something went wrong loading the articles");
        }

    });
}

/**
 * the following function returns the diff in seconds from the game startTime to endTime
 */
function calcSec() {
    var endTime = (((new Date()).getTime() - startTime) / 1000);
    return Math.floor(endTime);
}

/**
 * converts seconds into a human friendly time
 * @param sec
 */
function time_formatter(sec) {

    //var day = Math.floor(sec/86400);
    var hr = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hr * 3600)) / 60);
    var secs = Math.floor(sec - (hr * 3600) - (min * 60));

    var hr_msg = (hr > 0) ? "" + hr + " hour" + pl(hr) : "";
    var min_msg = (min > 0) ? "" + min + " minute" + pl(min) : "";
    var sec_msg = (secs > 0) ? "" + secs + " second" + pl(secs) : "";

    return hr_msg + min_msg + sec_msg;
}


/**
 * the following function add a pluralization suffix to a string
 * @param s
 */
function pl(s) {
    return s > 1 ? "s " : " ";
}