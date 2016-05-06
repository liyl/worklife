/**
	how to call javascript function by string(function name)
*/

1. use window

var testfunc = function(){console.log(1)}

window['testfunc']();


2.use eval

eval('testfunc()');

