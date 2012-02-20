<?php

/*
 Huw Evans   2/24/2009 Original version
 Ferron Hanse 3/20/2009 Modified getRow function
 Ferron Hanse 3/08/2010 Made methods protected
 */


class DatabaseConnection
{
    protected $db;
    protected $query_result;

    /**
     * The following function connects to the database
     * @param $host - database hostname
     * @param $user - database username
     * @param $pass - database user password
     * @param $dbname - database password
     */
    protected function connect($host, $user, $pass, $dbname)
    {
        $this->db = mysqli_connect($host, $user, $pass, $dbname);

        if (!$this->db)
            die("error " . mysql_error());
    }

    /**
     * The following function executes stored procedure
     * @param $procname - stored procedure name
     * @param $args - stored procedure arguments
     * @return result_set
     */
    protected function callProcedure($procname, $args)
    {
        $proc = 'CALL ' . $procname . '(' . $args . ')';

        $result_set = mysqli_query($this->db, $proc);

        if (!$result_set)
            echo 'Failed to call stored procedure<p>';

        return $result_set;
    }

    /**
     * The following function executes queries
     * @param $proc - SQL Query
     * @return result_set
     */
    protected function sendQuery($proc)
    {
        $result_set = mysqli_query($this->db, $proc);

        if (!$result_set)
            echo 'Failed to call stored procedure<p>';

        return $result_set;
    }

    //Closes database connection
    protected function close()
    {
        $clsd = mysqli_close($this->db);

        if (!$clsd)
            echo 'Failure to close connection to database<p>';
    }

    //The following function gets a row from the database
    protected function getRow()
    {
        while ($data = $this->query_result->fetch_row())
        {
            for ($i = 0; $i < $this->query_result->field_count; $i++)
            {
                return $data[$i];
            }
        }
    }

    // the following function returns the # of rows returned in the resultset
    protected function getRowCount()
    {
        return mysqli_num_rows($this->query_result);
    }

    // the following function returns the data from the database
    protected function getData()
    {
        return mysqli_fetch_array($this->query_result, MYSQL_ASSOC);
    }

}

?>
