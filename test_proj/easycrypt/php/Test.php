<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/3/12
 * Time: 10:36 PM
 * To change this template use File | Settings | File Templates.
 */

require_once("EasyCrypt.php");

$easyCrypt = new EasyCrypt();
$test = 'test';
$enc = $easyCrypt->encrypt($test);
$dec = $easyCrypt->decrypt($enc);

echo 'Orginal Text: ' . $test . '<br /><br />';
echo 'Encrypted Text: ' . $enc . '<br /><br />';
echo 'Orginal Text: ' . $dec;



?>