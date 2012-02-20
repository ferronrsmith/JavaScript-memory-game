<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/3/12
 * Time: 10:36 PM
 * To change this template use File | Settings | File Templates.
 */
class EasyCrypt
{

    /*
     * CopyLeft (c) 2009 Ferron Hanse  All  Rights Reserved.
     *
     * This software is made available under the terms of the "GPL License"
     * A copy of this license is included with this source distribution
     * in "license.txt" and is also available at:
     * http://www.gnu.org/copyleft/gpl.html
     */

    /*
     * Last Update : 07 September 2009
     *
     */

     /*
      * Welcome to any suggestion : ferronrsmith@gmail.com
      */
     private $shift = 3;
     private $cipher = "@)*%/~^!?z";


     public function encrypt($data)
     {
    	$encrypted="";

         for($i=0;$i<strlen($data);$i++)
    		{
                //convert to ascii
    			$compared= ord($data{$i})+$this->shift;
                if($compared<100)
    			{
    				if($compared<10)
    					$encrypted .= "00" . strval($compared);
    				else
    					$encrypted .= "0" . strval($compared);
    			}
    			else {
                    $encrypted .= strval($compared);
                }
            }
    		//index for String substitution
    		$temp ="";
    		for ($j=0;$j<strlen($encrypted);$j++)//substitution
    		{
    			switch($encrypted{$j})
    			{
    				case '0':$temp .= $this->cipher{0};break;
    				case '1':$temp .= $this->cipher{1};break;
    				case '2':$temp .= $this->cipher{2};break;
    				case '3':$temp .= $this->cipher{3};break;
    				case '4':$temp .= $this->cipher{4};break;
    				case '5':$temp .= $this->cipher{5};break;
    				case '6':$temp .= $this->cipher{6};break;
    				case '7':$temp .= $this->cipher{7};break;
    				case '8':$temp .= $this->cipher{8};break;
    				case '9':$temp .= $this->cipher{9};break;
    				default:return;
    			}
    		}
    		$encrypted=$temp;//point $temp address to encrypted
            return $encrypted;
    	}

    	public function decrypt($encrypted)
    	{
    		$encryptedEx="";
    		for($j=0;$j<strlen($encrypted);$j++)//substitution
    		{
    			if($encrypted{$j}==$this->cipher{0})$encryptedEx .= '0';
    			else if($encrypted{$j}==$this->cipher{1})$encryptedEx .= '1';
    			else if($encrypted{$j}==$this->cipher{2})$encryptedEx .= '2';
    			else if($encrypted{$j}==$this->cipher{3})$encryptedEx .= '3';
    			else if($encrypted{$j}==$this->cipher{4})$encryptedEx .= '4';
    			else if($encrypted{$j}==$this->cipher{5})$encryptedEx .= '5';
    			else if($encrypted{$j}==$this->cipher{6})$encryptedEx .= '6';
    			else if($encrypted{$j}==$this->cipher{7})$encryptedEx .= '7';
    			else if($encrypted{$j}==$this->cipher{8})$encryptedEx .= '8';
    			else $encryptedEx .='9';
    		}

    		$encrypted=$encryptedEx;
    		$data="";
    		$temp=0;
    		for($i=0;$i<strlen($encrypted);$i=$i+3)
    		{
    			$temp= $encrypted{$i} . "" . $encrypted{$i+1} . "" . $encrypted{$i+2};
                $temp-=$this->shift;
                //convert value to int then from ascii to char
    			$data .= chr(floor($temp));
    		}
    		return $data;
    	}
}


?>