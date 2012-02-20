var boxopened = "";
var imgopened = "";
var count = 0;
var found = 0;
var dir = "/memo_test/backend/";
var host = getURL() + dir;
var gameType = 'sushi';


function nextRand(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

function randomizeCards() {
    var children = $("#boxcard").children();
    var child = $("#boxcard div:first-child");

    var array_img = [];
    var i;

    for (i = 0; i < children.length; i++) {
        array_img[i] = $("#" + child.attr("id") + " img").attr("src");
        child = child.next();
    }

    var child = $("#boxcard div:first-child");
    var z;

    for (z = 0; z < children.length; z++) {
        var randIndex = nextRand(0, array_img.length - 1);

        // set new image
        $("#" + child.attr("id") + " img").attr("src", array_img[randIndex]);
        array_img.splice(randIndex, 1);

        child = child.next();
    }
}

function resetGame() {
    document.location.reload();
}

function showCard() {

    var id = $(this).attr("id");

    if ($("#"+id+" img").is(":hidden")) {
        $("#boxcard div").unbind("click", showCard);

        $("#"+id+" img").slideDown('fast');

        if (imgopened == "") {
            boxopened = id;
            imgopened = $("#"+id+" img").attr("src");

            $.timer(300, function(timer){
                $("#boxcard div").bind("click", showCard);
            });


        } else {
            var currentopened = $("#"+id+" img").attr("src");
            if (imgopened != currentopened) {
                $.timer(400, function(timer){
                    $("#"+id+" img").slideUp('fast');
                    $("#"+boxopened+" img").slideUp('fast');
                    boxopened = "";
                    imgopened = "";
                });

            } else {
                // found
                $("#"+id+" img").addClass("opacity");
                $("#"+boxopened+" img").addClass("opacity");
                found++;
                boxopened = "";
                imgopened = "";
            }

            $.timer(400, function(timer){
                $("#boxcard div").bind("click", showCard);
            });
        }
        if(_ttime == 0)
            startTimer();
        count++;
        $("#count").html("" + count);

        if (found == 10) {
            var msg = '<span id="msg">Congrats ! You Found All Sushi With </span>';
            $("span.link").prepend(msg);
            stopTimer();

            $.timer(200, function(timer){
                $("#win").jqm().jqmShow();
                $("#dialogImg").show();
            });
        }
    }
}

function LogScore() {
    var username = $("#username").val();
    saveScore(username, count);
}

function saveScore(name, time) {

    var url = host + "LogScore.php";

    $.ajax({
        type:"GET",
        url:url, //?playername=kira&timetaken=5'
        data:"playername=" + name + "&clicks=" + time,
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
                    '<td>' + (val.clicks) + '</td>' +
                    '</tr>');
            });
        }
        else {
            console.log("Aw Snap! : Something went wrong loading the articles");
        }

    });
}

/**
 * the following function gets the direct url for the link
 */
function getURL() {
    var local = document.location;
    return local.protocol + "//" + local.host;
}