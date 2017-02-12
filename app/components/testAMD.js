define(['jquery'], function($) {

	var el = $('<div id="main" style="width:100px"></div>');
	var tabs = ['a','b','c','d'];

    var HelloWorldize = function(selector) {
    	var tabsHTML = '<ul>';
    	console.log('el width=' + el.width(),el);
    	tabs.forEach(function(item){ 
    		tabsHTML += '<li style="width:50px">' + item + '</li>';	
    	});
    	var tabsEl = $(tabsHTML);
    	el.append(tabsEl);
    	console.log('tabs width=' + tabsEl.width(),tabsEl,el);
    	console.log('selecor width=' + $(selector).width());
    	$(selector).append(el);
    	console.log('selecor width=' + $(selector).width());
    	console.log('tabs width now=' + tabsEl.width());
    };

    return HelloWorldize;
});