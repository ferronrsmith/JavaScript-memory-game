<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/1/12
 * Time: 7:34 PM
 * To change this template use File | Settings | File Templates.
 */


    interface PlayerTemplate
    {

        //the following function retrieve scores from the database
        public function GetLeaderBoard();

        // the following function retrieve the top 10 scores from the datbase
        public function GetTopScores();

        /**
         * add player score to the datbase
         * @param $name - player name
         * @param $time - game duration (in secconds)
         */
        public function AddScore($name, $time);

        //The following function displays comments from database
        public function displayInfo();

        //the following function converts a resultset to JSON format
        public function scoreToJSON();
    }

?>