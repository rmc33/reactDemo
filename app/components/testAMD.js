define(['jquery'], function($) {

    var HelloWorldize = function(selector){
    	if (selector)
        	$(selector).text('hello world');

    };

    return HelloWorldize;
});