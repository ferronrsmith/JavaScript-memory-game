<?php

/**
 * Configuration containing database credentials
 *
 */

class Config
{

    private $SERVER = "localhost";
    private $USERNAME = "root";
    private $PASSWORD = "p@ssw0rd";
    private $DATABASE = "memotest";
    private $REMOTE_CONFIG = true;


    /**
     * The following method returns the server name
     * @return var
     */
    function getServer()
    {
        return $this->SERVER;
    }

    /**
     * The following method returns the server username
     * @return var
     */
    function getUsername()
    {
        return $this->USERNAME;
    }

    /**
     * The following method returns the server password
     * @return var
     */
    function getPassword()
    {
        return $this->PASSWORD;
    }

    /**
     * The following method returns the database name
     * @return var
     */
    function getDB()
    {
        return $this->DATABASE;
    }

    /**
     * The following method returns  if connected to a remote server otherwise false
     * @return bool
     */
    function getServerLocale()
    {
        return $this->REMOTE_CONFIG;
    }

}

?>