<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/3/12
 * Time: 10:36 PM
 * To change this template use File | Settings | File Templates.
 */


header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');


require_once("EasyCrypt.php");


$encrypted_text = $_GET['cipher'];

$easyCrypt = new EasyCrypt();
//$enc = $easyCrypt->encrypt($test);

$dec = $easyCrypt->decrypt($encrypted_text);


echo json_encode(array('plaintext' => $dec));

?>