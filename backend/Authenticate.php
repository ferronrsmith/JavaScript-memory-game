<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 12/30/11
 * Time: 6:50 PM
 * To change this template use File | Settings | File Templates.
 */

require_once("DatabaseConnection.php");
require_once("_config.php");

class Authenticate extends DatabaseConnection
{

    protected $cred;

    function Authenticate()
    {
        $this->cred = new Config();
        parent::connect($this->cred->getServer(), $this->cred->getUsername(), $this->cred->getPassword(), $this->cred->getDB());
    }


    /**
     * The following function returns true if remote config boolean is set to true
     * @return bool
     */
    protected function isRemoteHostConfig()
    {
        return $this->cred->getServerLocale();
    }

}

?>
