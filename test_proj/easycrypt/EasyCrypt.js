/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/3/12
 * Time: 5:01 PM
 * To change this template use File | Settings | File Templates.
 */

/*
 * CopyLeft (c) 2009 Ferron Hanse  All  Rights Reserved.
 *
 * This software is made available under the terms of the "GPL License"
 * A copy of this license is included with this source distribution
 * in "license.txt" and is also available at:
 * http://www.gnu.org/copyleft/gpl.html
 *
 * Last Update : 07 September 2009
 * Converted to Java
 * JSLint 100%
 *
 * Welcome to any suggestion : ferronrsmith@gmail.com
 */

//var shift = 3;
//var cipher = "@)*%/~^!?z";

var shift = 4;
var cipher = "@)*/%~!^?g";	
	
var EasyCrypt = {

	encrypt : function (data) {
		"use strict";
		var encrypted = "", i, compared, j, temp = "";
		for (i = 0; i < data.length; i += 1) {
			compared = data.charCodeAt(i) + shift;
            if (compared < 100) {
				if (compared < 10) {
					encrypted += "00" + compared.valueOf();
				} else {
					encrypted += "0" + compared.valueOf();
				}
			} else {
				encrypted += compared.valueOf();
			}
		}
		for (j = 0; j < encrypted.length; j += 1) { //substitution
			switch (encrypted.charAt(j)) {
		    case '0': temp += cipher.charAt(0); break;
			case '1': temp += cipher.charAt(1); break;
			case '2': temp += cipher.charAt(2); break;
			case '3': temp += cipher.charAt(3); break;
			case '4': temp += cipher.charAt(4); break;
			case '5': temp += cipher.charAt(5); break;
			case '6': temp += cipher.charAt(6); break;
			case '7': temp += cipher.charAt(7); break;
			case '8': temp += cipher.charAt(8); break;
			case '9': temp += cipher.charAt(9); break;
			default: return;
			}
		}
		encrypted = temp;//point temp address to encrypted
		return encrypted;
	},
	decrypt : function (encrypted) {
		"use strict";
		var i, j, encryptedEx = "", data = "", temp = 0; //index for String substitution
		for (j = 0; j < encrypted.length; j += 1) { //substitution
			if (encrypted.charAt(j) === cipher.charAt(0)) {
				encryptedEx += '0';
			} else if (encrypted.charAt(j) === cipher.charAt(1)) {
				encryptedEx += '1';
			} else if (encrypted.charAt(j) === cipher.charAt(2)) {
				encryptedEx += '2';
			} else if (encrypted.charAt(j) === cipher.charAt(3)) {
				encryptedEx += '3';
			} else if (encrypted.charAt(j) === cipher.charAt(4)) {
				encryptedEx += '4';
			} else if (encrypted.charAt(j) === cipher.charAt(5)) {
				encryptedEx += '5';
			} else if (encrypted.charAt(j) === cipher.charAt(6)) {
				encryptedEx += '6';
			} else if (encrypted.charAt(j) === cipher.charAt(7)) {
				encryptedEx += '7';
			} else if (encrypted.charAt(j) === cipher.charAt(8)) {
				encryptedEx += '8';
			} else {
				encryptedEx += '9';
			}
		}
		encrypted = encryptedEx;
		for (i = 0; i < encrypted.length; i = i + 3) {
            temp = parseInt(encrypted.charAt(i).toString() + encrypted.charAt(i + 1).toString() + encrypted.charAt(i + 2), 10);
            temp -= shift;
			data += String.fromCharCode(temp);
		}
		return data;
	}
};