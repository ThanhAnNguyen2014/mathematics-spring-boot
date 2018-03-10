!function(){
	var qa = {};
	qa.mathquill = function(e){
		var html = e.innerHTML;
		e.innerHTML = html.replace(/\\\(|\\\)/g,"");
		$(e).mathquill();
	}
	window.QA = qa;
}();