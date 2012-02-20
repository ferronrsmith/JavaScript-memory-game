<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 12/30/11
 * Time: 7:38 PM
 * To change this template use File | Settings | File Templates.
 */

header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');

require_once("PlayerScore.php");
require_once("SushiGameScore.php");



$type = $_GET['type'];

if($type === 'memo') {
    $leaderboard = new PlayerScore();
    $leaderboard->GetTopScores();
    echo $leaderboard->scoreToJSON();
}
else if($type === 'sushi') {
    $leaderboard = new SushiGameScore();
    $leaderboard->GetTopScores();
    echo $leaderboard->scoreToJSON();
}

?>