<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/1/12
 * Time: 7:27 PM
 * To change this template use File | Settings | File Templates.
 */

require_once("Authenticate.php");
require_once("PlayerTemplate.php");

class SushiGameScore extends Authenticate implements PlayerTemplate
{
    function GetPlayerScores()
    {
        $auth = new Authenticate();
    }


    public function GetLeaderBoard()
    {
        if ($this->isRemoteHostConfig()) {
            $this->query_result = $this->sendQuery('select name,clicks from sushi_game_stats order by clicks ASC');
        }
        else {
            $args = '';
            $this->query_result = $this->callProcedure('GetAllSushiResults', $args);
        }
    }

    public function GetTopScores()
    {
        if ($this->isRemoteHostConfig()) {
            $this->query_result = $this->sendQuery('select name,clicks from sushi_game_stats order by clicks ASC limit 0,10');
        }
        else {
            $args = '';
            $this->query_result = $this->callProcedure('GetSushiTopTenResults', $args);
        }
    }

    public function AddScore($name, $time)
    {
        if ($this->isRemoteHostConfig()) {
            $query = "select * from sushi_game_stats where name = '" . $name . "'";
            $this->query_result = $this->sendQuery($query);

            if ($this->getRowCount() < 1) {
                $this->query_result = $this->sendQuery("insert into sushi_game_stats set clicks ='" . $time . "', name='" . $name . "'");
            }
            else {
                if($time < $this->getCurrentScore())
                    $this->query_result = $this->sendQuery("update sushi_game_stats set clicks ='" . $time . "' where name = '" . $name . "'");
            }
        }
        else {
            $args = "'" . $name . "','" . $time . "'";
            $this->query_result = $this->callProcedure('AddSushiResult', $args);
        }
    }

    public function displayInfo()
    {
        // TODO: Implement displayInfo() method.
        // This method may not be needed
    }

    private function getCurrentScore()
    {
        if ($this->query_result == null)
           return 'no data found';

        while($row = $this->getData())
        {
            return $row["clicks"];
        }
    }

    public function scoreToJSON()
    {
        $stack = array();

        if ($this->query_result == null)
            return 'no data found';

        while ($row = $this->getData())
        {
            array_push($stack, array("name" => $row["name"], "clicks" => $row["clicks"]));
        }

        return json_encode($stack);
    }
}
