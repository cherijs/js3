
/**
 * JS3 - A simple AS3 drawing api for the JavaScript Canvas
 * Version : 0.1.47
 * Link : https://github.com/braitsch/JS3
 * Author : Stephen Braitsch :: @braitsch
**/

function JS3(cnvs)
{
		var _canvas 	= document.getElementById(cnvs);
		var _context 	= _canvas.getContext("2d");
		var _width 		= _canvas.width;
		var _height 	= _canvas.height;
		var _target		= undefined;
		var _dragObj	= undefined;	
		var _children 	= [];
		var _graphics	= [];
		var _runners	= [];
		var _tweens		= [];
		var _drawClean 	= true;
		var _background = '#ffffff';
		var _winTitle	= 'My Canvas';
	
	// public getters & setters //
	
	 	this.__defineGetter__("width", 			function()		{ return _width;});
	 	this.__defineGetter__("height", 		function()		{ return _height;});
	 	this.__defineGetter__("numChildren", 	function()		{ return _children.length;});
	 	this.__defineSetter__("drawClean", 		function(b)		{ _drawClean = b;});
	 	this.__defineSetter__("background", 	function(b)		{ _background = b; drawBackground();});
	 	this.__defineSetter__("windowTitle", 	function(s)		{ _winTitle = s;});	
	
	// display list management //	
	
		this.addChild = function(o){
			o.stage = _context; _children.push(o);
		}	
		this.addChildAt = function(o, n){
			if (n <= _children.length) _children.splice(n, 0, o);
		}			
		this.getChildAt = function(n){
			return _children[n];
		}
		this.getChildAtRandom = function(){
			return _children[Math.floor(Math.random()*_children.length)];
		}
		this.removeChild = function(o, k){
			for (var i = _children.length - 1; i >= 0; i--){ if (_children[i] == o){ removeChildAt(i, k); break; }};
		}		
		this.removeChildAt = function(i, k){
			if (k) _children[i] = null; _children.splice(i, 1); 
		}					
		
	// 	animation methods //
	
		this.run = function(func, delay, repeat, onComp){
		// prevent double running //	
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) return;
			_runners.push({f:func, d:delay, r:repeat, o:onComp, t:Date.now()});
		}	
		this.stop = function(func){stopRunner(func);}	
		this.tween = function(obj, secs, props){
			if (obj.isTweening) return;
				obj.isTweening = true;
			var t = new Tween(obj, secs, props);
			t.delay == undefined ? initTween(t) : setTimeout(initTween, t.delay * 1000, t);
		}
		this.clear = function(){
			while(_children.length) {_children[0] = null; _children.splice(0, 1);}
			while(_graphics.length){ _graphics[0] = null; _graphics.splice(0, 1);}
			while(_tweens.length) {_tweens[0] = null; _tweens.splice(0, 1);}
			while(_runners.length) {_runners[0] = null; _runners.splice(0, 1);}					
			_children = []; _graphics = []; _tweens = []; _runners = []; drawBackground();
		}
		this.setSize = function(w, h){
			_canvas.width = _width = w; _canvas.height = _height = h;
		}			
		this.save = function(){
	// save canvas as a png //		
			var img = _canvas.toDataURL('image/png');
			var win = window.open('', '_blank', 'width='+_width+', height='+_height);
				win.document.write('<!DOCTYPE html style="padding:0; margin:0"><head><title>'+_winTitle+'</title>');
	 			win.document.write('</head><body style="background: #f2f2f2; padding:0; margin:0">');
	 			win.document.write('<img src="' + img + '"/>');
	 			win.document.write('</body></html>');
	 			win.document.close();
		}
		
	// basic drawing methods //	
	
		this.drawLine	= function(o){ o.stage=_context;_graphics.push(new JS3Line(o)); 	}
		this.drawArc	= function(o){ o.stage=_context;_graphics.push(new JS3Arc(o)); 		}
		this.drawRect	= function(o){ o.stage=_context;_graphics.push(new JS3Rect(o));  	}
		this.drawCircle	= function(o){ o.stage=_context;_graphics.push(new JS3Circle(o));	}
		this.drawTri	= function(o){ o.stage=_context;_graphics.push(new JS3Tri(o));		}
		this.drawText 	= function(o){ o.stage=_context;_graphics.push(new JS3Text(o)); 	}
			
	// mouse events //
	
		_canvas.addEventListener("click", onMouseClick);	
		_canvas.addEventListener("mousemove", onMouseMove);
		_canvas.addEventListener("mousedown", onMouseDown);
		_canvas.addEventListener("mouseup", function(){_target = undefined;});
		
		function onMouseClick(e)
		{
			console.log('click', _target);
		}
		
		function onMouseMove(e)
		{
		    var oX = 0; var oY = 0; var k = _canvas;
		    do { oX += k.offsetLeft; oY += k.offsetTop; } while (k = k.offsetParent);		
			_context.mx = e.pageX - oX; _context.my = e.pageY - oY;
		// update mouse cursor //
			var on = false;
			for (var i = _children.length - 1; i >= 0; i--) if (_children[i].enabled && _children[i].mouse) { on=true; break; }
			window.document.body.style.cursor = on?'pointer':'default';
		// update draggable target  //			
			if (_target.draggable) {
				_target.x += _context.mx - _context.dx;
				_target.y += _context.my - _context.dy;
				_context.dy = _context.my; _context.dx = _context.mx;
				if (_target._onDragChange != undefined) _target._onDragChange(_target);
			}
		}
		
		function onMouseDown(e)
		{	
			_context.dx = _context.mx; _context.dy = _context.my;
			for (var i = _children.length - 1; i >= 0; i--) if (_children[i].enabled && _children[i].mouse && _children[i].draggable) {
				_target = _children[i]; _children.splice(i, 1); _children.push(_target);
			}
		}			
		
	// private instance methods //
		
		var drawBackground = function(){
			_context.fillStyle = _background;
			_context.fillRect(0, 0, _width, _height);			
		}
		var initTween = function(t){
			t.start = Date.now(); _tweens.push(t)	
		}
		var stopRunner = function(func){
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) { _runners.splice(i, 1); };
		}
		var render = function(){
		// render display list objects //				
			i = 0; while ( i < _children.length ) { var k = _children[i]; k.update(k); i++;}			
		// render non-persistent graphics //
			while ( _graphics.length ) { var k = _graphics[0]; k.update(k); _graphics.splice(0, 1); k = null;}
		}
		var loop = function(){
			execTweens(); execRunners(); if (_drawClean) drawBackground(); render();
		}
		var execTweens = function(){
			for (var i=0; i < _tweens.length; i++){
				t = _tweens[i];
			// fire the onStart callback //	
				if (t.elapsed == 0 && t.onStart != undefined) t.onStart(); 
					t.elapsed = Date.now() - t.start;
			// update properties with new tweened values //		
				for(p in t.props) t.object[p] = t.easeFunc(t.elapsed, t.props[p].a, t.props[p].b, t.duration);
				if (t.elapsed >= t.duration) {
					_tweens.splice(i, 1);
					t.object.isTweening = false;
			// fire the onComplete callback //				
					if (t.onComplete != undefined) t.onComplete();
				}		
			}	
		}
		var execRunners = function(){
			var d = Date.now();
			for (var i=0; i < _runners.length; i++){
				var r = _runners[i];
				if (r.d === undefined || d - r.t > r.d*1000) {
					r.f(); r.t = d;
					if (r.r != undefined) {
						r.r--;
						if (r.r == 0){
							stopRunner(r.f);
					// execute callback when run repeat count completes //
							if (r.o != undefined) r.o();
						}
					}					
				}
			}				
		}
// add this JS3 instance to the window animation loop //
	JS3.func.push(loop);
}

// --- static class methods --- //

JS3.getRandomColor = function(){return '#' + Math.round(0xffffff * Math.random()).toString(16);}
JS3.getRandomValue = function(n1, n2){if (n1 == undefined){return Math.random();}else if (n2 == undefined){return Math.random()*n1;}else{return (Math.random()*(n2-n1))+n1;}};

// --- static drawing methods --- //

JS3.drawLine = function(o){
	o.stage.globalAlpha = o.alpha;
	o.stage.beginPath();
	o.stage.moveTo(o.x+(o.x1||0), o.y+(o.y1||0));
	o.stage.lineTo(o.x+(o.x2||0), o.y+(o.y2||0));
	JS3.stroke(o);	
	o.stage.globalAlpha = 1;
}
JS3.drawArc = function(o){	
	o.stage.globalAlpha = o.alpha;
	o.stage.beginPath();
	o.stage.moveTo(o.x+(o.x1||0), o.y+(o.y1||0));
 	o.stage.quadraticCurveTo(o.x+(o.cx||0), o.y+(o.cy||0), o.x+(o.x2||0), o.y+(o.y2||0));	
	JS3.stroke(o);
	o.stage.globalAlpha = 1;			
}		
JS3.drawRect = function(o){
	o.stage.globalAlpha = o.alpha;	
	o.stage.beginPath();
	o.stage.rect(o.x, o.y, o.width, o.height);
	o.mouse = o.stage.isPointInPath(o.stage.mx, o.stage.my);
	o.stage.closePath();	
	if (o.fill) JS3.fill(o);
	if (o.stroke) JS3.stroke(o);			
	o.stage.globalAlpha = 1;
}
JS3.drawCirc = function(o){
	o.stage.globalAlpha = o.alpha;
	ox = (o.width / 2) * .5522848;
	oy = (o.height / 2) * .5522848;
	xe = o.x + o.width;
	ye = o.y + o.height;
	xm = o.x + o.width/2;
	ym = o.y + o.height/2;
	o.stage.beginPath();
	o.stage.moveTo(o.x, ym);
	o.stage.bezierCurveTo(o.x, ym - oy, xm - ox, o.y, xm, o.y);
	o.stage.bezierCurveTo(xm + ox, o.y, xe, ym - oy, xe, ym);
	o.stage.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	o.stage.bezierCurveTo(xm - ox, ye, o.x, ym + oy, o.x, ym);
	o.mouse = o.stage.isPointInPath(o.stage.mx, o.stage.my);
	o.stage.closePath();
	if (o.fill) JS3.fill(o);
	if (o.stroke) JS3.stroke(o);
	o.stage.globalAlpha = 1;
}

JS3.drawTri = function(o){
	o.stage.globalAlpha = o.alpha;	
 	o.stage.beginPath();
	o.x1 = o.x1 || 0;
	o.y1 = o.y1 || o.height || o.size;
	o.x2 = o.x2 || o.width/2 || o.size/2;
	o.y2 = o.y2 || 0;
	o.x3 = o.x3 || o.width || o.size;
	o.y3 = o.y3 || o.height || o.size;
	o.stage.lineTo(o.x + o.x1, o.y + o.y1);
	o.stage.lineTo(o.x + o.x2, o.y + o.y2);
	o.stage.lineTo(o.x + o.x3, o.y + o.y3);
	o.stage.lineTo(o.x + o.x1, o.y + o.y1);
	o.mouse = o.stage.isPointInPath(o.stage.mx, o.stage.my);
	o.stage.closePath();	
	if (o.fill) JS3.fill(o);
	if (o.stroke) JS3.stroke(o);
	o.stage.globalAlpha = 1;
}
JS3.drawText = function(o){
	console.log(o, o.text, o.x, o.y, o.stage)
	o.stage.globalAlpha = o.alpha;
	o.stage.font = o.size+'pt '+o.font;
	o.stage.fillStyle = o.color;
	o.stage.textAlign = o.align;
	o.stage.fillText(o.text, o.x, o.y);			
	o.stage.globalAlpha = 1;			
}		
JS3.fill = function(o){
	o.stage.globalAlpha = o.alpha * o.fillAlpha;			
    o.stage.fillStyle = o.fillColor;
	o.stage.fill();
	o.stage.globalAlpha = 1;
}
JS3.stroke = function(o){	
	o.stage.globalAlpha = o.alpha * o.strokeAlpha;
	o.stage.lineCap = o.capStyle;
    o.stage.lineWidth = o.strokeWidth;
    o.stage.strokeStyle = o.strokeColor;	
	o.stage.stroke();
	o.stage.globalAlpha = 1;
}

// --- rob penners's easing equations from http://www.robertpenner.com/easing --- //

JS3.linear = function (t, b, c, d) { return c*t/d + b; };
JS3.easeInQuad = function (t, b, c, d) { t /= d; return c*t*t + b; };
JS3.easeOutQuad = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };
JS3.easeInOutQuad = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t + b; t--; return -c/2 * (t*(t-2) - 1) + b; };
JS3.easeInCubic = function (t, b, c, d) { t /= d; return c*t*t*t + b; };
JS3.easeOutCubic = function (t, b, c, d) { t /= d; t--; return c*(t*t*t + 1) + b; };
JS3.easeInOutCubic = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t + b; t -= 2; return c/2*(t*t*t + 2) + b; };
JS3.easeInQuart = function (t, b, c, d) { t /= d; return c*t*t*t*t + b; };
JS3.easeOutQuart = function (t, b, c, d) { t /= d; t--; return -c * (t*t*t*t - 1) + b; };
JS3.easeInOutQuart = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t*t + b; t -= 2; return -c/2 * (t*t*t*t - 2) + b; };
JS3.easeInQuint = function (t, b, c, d) { t /= d; return c*t*t*t*t*t + b; };
JS3.easeOutQuint = function (t, b, c, d) { t /= d; t--; return c*(t*t*t*t*t + 1) + b; };
JS3.easeInOutQuint = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t*t*t + b; t -= 2; return c/2*(t*t*t*t*t + 2) + b; };
JS3.easeInSine = function (t, b, c, d) { return -c * Math.cos(t/d * (Math.PI/2)) + c + b; };
JS3.easeOutSine = function (t, b, c, d) { return c * Math.sin(t/d * (Math.PI/2)) + b; };
JS3.easeInOutSine = function (t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; };
JS3.easeInExpo = function (t, b, c, d) { return c * Math.pow( 2, 10 * (t/d - 1) ) + b; };
JS3.easeOutExpo = function (t, b, c, d) { return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b; };
JS3.easeInOutExpo = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b; t--; return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b; };
JS3.easeInCirc = function (t, b, c, d) { t /= d; return -c * (Math.sqrt(1 - t*t) - 1) + b; };
JS3.easeOutCirc = function (t, b, c, d) { t /= d; t--; return c * Math.sqrt(1 - t*t) + b; };
JS3.easeInOutCirc = function (t, b, c, d) { t /= d/2; if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b; t -= 2; return c/2 * (Math.sqrt(1 - t*t) + 1) + b; };

// --- frame rate management --- //

JS3.func = [];
JS3.loop = function(){JS3.getFrameRate();for(var i=0; i < JS3.func.length; i++)JS3.func[i]();window.getAnimFrame(JS3.loop);};
window.getAnimFrame = (function(){
	return  window.requestAnimationFrame		|| 
			window.webkitRequestAnimationFrame 	||
			window.mozRequestAnimationFrame    	||
			window.oRequestAnimationFrame      	||
			window.msRequestAnimationFrame     	||
	function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();
JS3.getFrameRate = function(){
	var now = window.mozAnimationStartTime || Date.now();
	JS3.FR = 1000 / (now - JS3.FT); JS3.FT = now;			
};
JS3.showFrameRate = function(x, y){
	if (document.getElementById('JS3FR')) return;
	var d = document.createElement('div');
		d.setAttribute('id', 'JS3FR');
		d.style.position = "absolute";
		d.style.top = y!=undefined ? y+'px' : '100px'; d.style.left = x!=undefined ? x+'px' : '100px';
		d.style.background = "#333"; d.style.border = "1px solid #555";
		d.style.color = '#00ff00'; d.style.padding = '10px';
		d.style.fontSize = '16px'; d.style.fontFamily = 'Arial,sans-serif';
		d.style.textShadow='1px 1px 0 #000';
		d.innerHTML = '60.0 fps';		
	document.body.appendChild(d);
	setInterval(function(){
		var n = JS3.FR.toFixed(1);
		d.innerHTML = n+' fps';		
		if (n<15){d.style.color = '#ff0000';}else if (n>=15 && n<=30){d.style.color = '#ffff00';} else{d.style.color = '#00ff00';}
	}, 1000);
}
JS3.FR = 0; JS3.FT = Date.now() - 1;
// start the main animation loop //
window.getAnimFrame(JS3.loop);

// graphic primitives //

function JS3Line(o)
{
	JS3getBaseProps(this);
	JS3getLineProps(this);
	this.update = JS3.drawLine;
	if (o) JS3.copyObj(o, this);
}

function JS3Arc(o)
{
	JS3getBaseProps(this);	
	JS3getLineProps(this);	
	this.update = JS3.drawArc;
	if (o) JS3.copyObj(o, this);
}

function JS3Tri(o)
{
	JS3getBaseProps(this);	
	this.update = JS3.drawTri;
	if (o) JS3.copyObj(o, this);
	this.p1 = {}; this.p2 = {}; this.p3 = {};	
}

function JS3Rect(o)
{
	JS3getBaseProps(this);
	this.update = JS3.drawRect;		
	if (o) JS3.copyObj(o, this);
}

function JS3Circle(o)
{
	JS3getBaseProps(this);
	this.update = JS3.drawCirc;
	if (o) JS3.copyObj(o, this);
}

function JS3Text(o)
{
	JS3getBaseProps(this);
	JS3getTextProps(this);
	this.update = JS3.drawText;
	if (o) JS3.copyObj(o, this);	
}

function JS3getBaseProps(o)
{	
	o.__defineGetter__("size", 	 		function()		{ return o._size;});
	o.__defineSetter__("size", 	 		function(s)		{ o._size=o.width=o.height=s;});
	o.__defineSetter__("onClick",		function(f)		{ o._onClick=f;o.enabled=true;});
	o.__defineSetter__("onHover",		function(f)		{ o._onHover=f;o.enabled=true;});
	o.__defineSetter__("onDragStart",	function(f)		{ o._onDragStart=f;o.enabled=o.draggable=true;});
	o.__defineSetter__("onDragChange",	function(f)		{ o._onDragChange=f;o.enabled=o.draggable=true;});
	o.__defineSetter__("onDragComplete",function(f)		{ o._onDragComplete=f;o.enabled=o.draggable=true;});
	o.x=o.y=0; o._size=o.width=o.height=25; o.fillColor='#ddd'; o.strokeColor='#ccc'; o.fill=o.stroke=true;o.alpha=o.scale=o.rotation=o.fillAlpha=o.strokeAlpha=1; o.strokeWidth=2;
}

function JS3getLineProps(o)
{
	o.capStyle='butt';
	o.__defineSetter__("color", 	function(s)		{ o.strokeColor=s;});	
	o.__defineSetter__("thickness", function(s)		{ o.strokeWidth=s;});
}

function JS3getTextProps(o)
{
	o.size=12; o.font='Arial'; o.color='#333'; o.align='center';
}

JS3.copyObj = function(o1, o2){ for (var k in o1) o2[k] = o1[k]; o1 = null;}

function Tween(obj, dur, props)
{
	this.object 	= obj;
	this.duration 	= dur * 1000;
	this.delay 		= props.delay;
	this.start		= 0;
	this.elapsed	= 0;
	this.onStart	= props.onStart;
	this.onComplete	= props.onComplete;
	this.easeFunc	= props.ease || JS3.linear;
	this.props 		= {};	
	for (var p in props) if (isNumber(props[p])) this.props[p] = {a:obj[p], b:props[p]-obj[p]};
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var trace = function(m){ try{ console.log(m); } catch(e){ return; }};