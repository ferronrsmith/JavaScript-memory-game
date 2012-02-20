/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/4/12
 * Time: 8:52 PM
 * To change this template use File | Settings | File Templates.
 */

var mockjaxDefaults = $.extend({}, $.mockjaxSettings);

var sampleJSON = '{"title":"Rope and Wood","url":"/music/jazz.mp3"}';

function noErrorCallbackExpected() {
	ok( false, 'Error callback executed');
}

// Speed up our tests
$.mockjaxSettings.responseTime = 0;

module('Ajax Mock');
asyncTest('Intercept and responseText (sub-ajax request)', function() {
	$.mockjax({
		url: '/tracks',
		responseText : sampleJSON
	});

	$.ajax({
		url: '/tracks',
		dataType: 'json',
		success: function(data) {
			ok(data && data.title, 'ResponseText request succeeded');
		},
		error: noErrorCallbackExpected,
		complete: function() {
			start();
		}
	});

	$.mockjaxClear();
});

asyncTest('Read repsonse text', function() {
	$.mockjax({
		url: '/tracks',
		responseText : sampleJSON
	});

	$.ajax({
		url: '/tracks',
		dataType: 'json',
		success: function(data) {
			equal('Rope and Wood',data.title, 'Title successful retrieved from JSON Object');
		},
		error: noErrorCallbackExpected,
		complete: function() {
			start();
		}
	});

	$.mockjaxClear();
});


