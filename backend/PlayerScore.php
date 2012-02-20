<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 12/30/11
 * Time: 6:49 PM
 * To change this template use File | Settings | File Templates.
 */

require_once("Authenticate.php");
require_once("PlayerTemplate.php");

class PlayerScore extends Authenticate implements PlayerTemplate
{

    function GetPlayerScores()
    {
        $auth = new Authenticate();
    }


    //the following function retrieve scores from the database
    function GetLeaderBoard()
    {

        if ($this->isRemoteHostConfig()) {
            $this->query_result = $this->sendQuery('select name,time from player_stats order by time ASC');
        }
        else {
            $args = '';
            $this->query_result = $this->callProcedure('GetAllResults', $args);
        }

    }

    // the following function retrieve the top 10 scores from the datbase
    function GetTopScores()
    {
        if ($this->isRemoteHostConfig()) {
            $this->query_result = $this->sendQuery('select name,time from player_stats order by time ASC limit 0,10');
        }
        else {
            $args = '';
            $this->query_result = $this->callProcedure('GetTopTenResults', $args);
        }
    }

    /**
     * add player score to the datbase
     * @param $name - player name
     * @param $time - game duration (in secconds)
     */
    function AddScore($name, $time)
    {
        if ($this->isRemoteHostConfig()) {
            $query = "select * from player_stats where name = '" . $name . "'";
            $this->query_result = $this->sendQuery($query);

            if ($this->getRowCount() < 1) {
                $this->query_result = $this->sendQuery("insert into player_stats set time ='" . $time . "', name='" . $name . "'");
            }
            else {
                if($time < $this->getCurrentScore())
                    $this->query_result = $this->sendQuery("update player_stats set time ='" . $time . "' where name = '" . $name . "'");
            }
        }
        else {
            $args = "'" . $name . "','" . $time . "'";
            $this->query_result = $this->callProcedure('AddResult', $args);
        }
    }

    /**
     * Get the current score from the database
     * @return string
     */
    private function getCurrentScore()
    {
        if ($this->query_result == null)
           return 'no data found';

        while($row = $this->getData())
        {
            return $row['time'];
        }
    }


    //The following function displays comments from database
    function displayInfo()
    {
        if ($this->query_result == null)
            return 'no data found';

        while ($row = $this->getData())
        {
            echo "<p> {$row['name']} &nbsp;" . "{$this->time_formatter($row['time'])}<br></p>";
        }
    }

    //the following function converts a resultset to JSON format
    function scoreToJSON()
    {
        $stack = array();

        if ($this->query_result == null)
            return 'no data found';

        while ($row = $this->getData())
        {
            array_push($stack, array("name" => $row["name"], "time" => $row["time"]));
        }

        return json_encode($stack);
    }

    /**
     * The following function formats seconds to a friendly format
     * Adapted from the javascript time_formatter
     * @param $sec
     * @return string
     */
    private function time_formatter($sec)
    {
        //$day = floor($sec/86400);
        $hr = floor($sec / 3600);
        $min = floor(($sec - ($hr * 3600)) / 60);
        $secs = floor($sec - ($hr * 3600) - ($min * 60));

        $hr_msg = ($hr > 0) ? '' . $hr . ' hour' . $this->pl($hr) : '';
        $min_msg = ($min > 0) ? '' . $min . ' minute' . $this->pl($min) : '';
        $sec_msg = ($secs > 0) ? '' . $secs . ' second' . $this->pl($secs) : '';

        return $hr_msg . $min_msg . $sec_msg;
    }

    /**
     * the following function add a pluralization suffix to a string
     * @param $s
     * @return string
     */
    private function pl($s)
    {
        return ($s > 1) ? 's ' : ' ';
    }

}

?>