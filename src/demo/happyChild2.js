//window.Widgetfly.Modal.sizeChange(400);

$('#testimg').animate({
	height:300
},30000);

var times = 0, last = 150,
testtimer = setInterval(function(){
	var height = $(window).height();
	//console.log('now : '+height+'('+times+')');
	//console.log(last);
	if(height > 150 && times < 10){
		if(last === height){
			times = times + 1;
		}
		else{
			window.Widgetfly.Modal.sizeChange(height);
			//console.log(height);
		}
		last = height;
	}
	else if (height > 150 && times >= 10){
		console.log('start done');
		clearInterval(testtimer);
	}
}, 500);