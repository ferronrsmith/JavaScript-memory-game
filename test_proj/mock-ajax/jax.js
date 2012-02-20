/**
 * Created by JetBrains PhpStorm.
 * User: ferron
 * Date: 1/4/12
 * Time: 8:52 PM
 * To change this template use File | Settings | File Templates.
 */


var sampleJSON ='[{"name":"ben","clicks":"38"},{"name":"des","clicks":"45"},{"name":"benny","clicks":"46"},{"name":"unknown","clicks":"46"},{"name":"grumpy","clicks":"48"}]';
var mockjaxDefaults = $.extend({}, $.mockjaxSettings);
// Speed up our tests
$.mockjaxSettings.responseTime = 0;

$.mockjax({
	url: '/scores',
	responseText : sampleJSON
});

$.ajax({
	url: '/scores',
	dataType: 'json',
	success: function(data) {
        if (data) { //check if any data is returned
            $.each(data, function (key, val) {
                $("#tbBody").append('<tr>' +
                    '<td><i>' + val.name + '</i></td>' +
                    '<td>' + val.clicks + '</td>' +
                    '</tr>');
            });
        }
        else {
            console.log("Aw Snap! : Something went wrong loading the articles");
        }
	},
	error: function() {
        console.log('Error loading data');
    },
	complete: function() {
        $.mockjaxClear();
	}
});

