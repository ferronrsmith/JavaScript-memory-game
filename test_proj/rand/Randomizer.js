/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/4/12
 * Time: 5:41 AM
 * To change this template use File | Settings | File Templates.
 */


/**
* The following function counts the amount of unique items in an array
* @params limit - the anount of permutations to execute
*/
Array.prototype.uniqueCounter = function () {
    "use strict";
	var counter = 0, l = this.length, i, j;
    for (i = 0; i < l; i += 1) {
		for (j = i + 1; j < l; j += 1) {
        // If this[i] is found later in the array
			if (this[i] === this[j]) {
				j = i =+ 1;
			}
		}
		counter += 1;
    }
    return counter;
};


function generateRandomId(length) {
    "use strict";
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", returnValue = "", x, i;

    for (x = 0; x < length; x += 1) {
        i = Math.floor(Math.random() * 62);
        returnValue += chars.charAt(i);
    }

    return "JS_" + returnValue;
}