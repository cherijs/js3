$(document).ready(function() {
	drawCanvas();
});

function drawCanvas()
{
	var s1 = new JS3('d1');
	var s2 = new JS3('d2');	
		s1.drawClean = s2.drawClean = false;
	drawGrid(s1); 
	drawGrid(s2);
// line example //
	var line = new JS3Line(); 
	line.x = 50;
	line.y = 130;	
	line.y2 = -100;
	line.x2 = 340; 
	line.color = '#ff0000';
	s1.addChild(line);
	s1.drawText({text:'x1 / y1', x:50, y:150});
	s1.drawText({text:'x2 / y2', x:390, y:60});	
	
// arc example //	
	var arc = new JS3Arc();
	arc.color = '#ff0000';	
	arc.x = 50; 	
	arc.y = 190;
	arc.x1 = 0; 	
	arc.y1 = 0;
	arc.yc = -250; 	
	arc.xc = 170;
	arc.x2 = 340; 	
	arc.y2 = 0;	
	s2.addChild(arc);
	s2.drawText({text:'x1 / y1', y:210, x:50});
	s2.drawText({text:'xc / yc', y:50, x:220});	
	s2.drawText({text:'x2 / y2', y:210, x:390});	
}

function drawGrid(cnvs)
{
	var size = 20;
	for (var i=0; i < cnvs.height / size; i++) {
		var y = i*size;
		cnvs.drawLine({x1:0, y1:y, x2:cnvs.width, y2:y, strokeWidth:1});
	};
	for (var i=0; i < cnvs.width / size; i++) {
		var x = i*size;
		cnvs.drawLine({x1:x, y1:0, x2:x, y2:cnvs.height, strokeWidth:1});
	};	
}