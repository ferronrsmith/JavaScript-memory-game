<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 12/30/11
 * Time: 7:32 PM
 * To change this template use File | Settings | File Templates.
 */

require_once("PlayerScore.php");
require_once("SushiGameScore.php");


$player_name = $_GET['playername'];
$time_take = $_GET['timetaken'];
$clicks = $_GET['clicks'];

// check if play name || time is null
if (!is_null($player_name) && !is_null($time_take)) {
    $player_score = new PlayerScore();
    $player_score->AddScore($player_name, $time_take);
}
else if(!is_null($player_name) && !is_null($clicks))
{
    $player_score = new SushiGameScore();
    $player_score->AddScore($player_name, $clicks);
}
/*
else {
    echo '<p>error processing request</p>';
    echo $player_name . ' ' . $time_take;
    echo is_null($player_name);
} */

?>