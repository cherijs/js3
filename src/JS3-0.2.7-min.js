
/**
 * JS3 - A Drawing & Tweening API for the JavaScript Canvas
 * Version : 0.2.7
 * Release Date : May 17 2012
 * Documentation : http://js3.quietless.com/
 *
 * Copyright 2012 Stephen Braitsch :: @braitsch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
**/

function JS3(a){var b=this,c=document.getElementById(a),d=c.getContext("2d"),e=c.width,o=c.height,f=[],g=[],j=[],m=[],v=!0,w="#ffffff",x="My Canvas",y=0,h,l,n,r;Object.defineProperty(this,"width",{get:function(){return e}});Object.defineProperty(this,"height",{get:function(){return o}});Object.defineProperty(this,"numChildren",{get:function(){return f.length}});Object.defineProperty(this,"mousePressed",{get:function(){return null!=h}});Object.defineProperty(this,"position",{get:function(){for(var a=
0,b=0,d=c;null!=d;)a+=d.offsetLeft,b+=d.offsetTop,d=d.offsetParent;return{x:a,y:b}}});Object.defineProperty(this,"drawClean",{set:function(a){v=a}});Object.defineProperty(this,"background",{set:function(a){w=a;u()}});Object.defineProperty(this,"windowTitle",{set:function(a){x=a}});Object.defineProperty(this,"interactive",{set:function(a){a?(c.addEventListener("mousedown",z),c.addEventListener("mouseup",q),c.addEventListener("mousemove",A),c.addEventListener("mouseover",B),c.addEventListener("mouseout",
C),document.body.addEventListener("mouseup",q)):(c.removeEventListener("mousedown",z),c.removeEventListener("mouseup",q),c.removeEventListener("mousemove",A),c.removeEventListener("mouseover",B),c.removeEventListener("mouseout",C),document.body.removeEventListener("mouseup",q))}});JS3setStageEvents(this);this.addChild=function(a){a.parent=b;a.stage=d;f.push(a)};this.addChildAt=function(a,c){c<=f.length&&(a.parent=b);a.stage=d;f.splice(c,0,a)};this.getChildAt=function(a){return f[a]};this.getChildAtRandom=
function(){return f[Math.floor(Math.random()*f.length)]};this.removeChild=function(a){for(var b=f.length-1;0<=b;b--)if(f[b]==a){removeChildAt(b);break}};this.removeChildAt=function(a){f[a].parent=null;f[a].stage=null;f.splice(a,1)};this.run=function(a,b,c,d){for(var e=j.length-1;0<=e;e--)if(a==j[e].f)return;a=new JS3Runner(a,b,c,d);j.push(a);return a};this.stop=function(a){D(a)};this.tween=function(a,b,c){if(!a.isTweening){a.isTweening=!0;var d=new JS3Tween(a,b,c);void 0==d.delay?E(d):setTimeout(function(){E(d)},
1E3*d.delay)}};this.clear=function(){for(;f.length;)f[0]=null,f.splice(0,1);for(;g.length;)g[0]=null,g.splice(0,1);f=[];g=[];u()};this.reset=function(){for(;m.length;)m[0]=null,m.splice(0,1);for(;j.length;)j[0]=null,j.splice(0,1);m=[];j=[];this.clear()};this.setSize=function(a,b){c.width=e=a;c.height=o=b};this.save=function(){var a=c.toDataURL("image/png"),b=window.open("","_blank","width="+e+", height="+o);b.document.write('<!DOCTYPE html style="padding:0; margin:0"><head><title>'+x+"</title>");
b.document.write('</head><body style="background: #f2f2f2; padding:0; margin:0">');b.document.write('<img src="'+a+'"/>');b.document.write("</body></html>");b.document.close()};this.drawLine=function(a){a.stage=d;g.push(new JS3Line(a))};this.drawArc=function(a){a.stage=d;g.push(new JS3Arc(a))};this.drawRect=function(a){a.stage=d;g.push(new JS3Rect(a))};this.drawCircle=function(a){a.stage=d;g.push(new JS3Circle(a))};this.drawTri=function(a){a.stage=d;g.push(new JS3Tri(a))};this.drawText=function(a){a.stage=
d;g.push(new JS3Text(a))};var z=function(){d.dx=d.mx;d.dy=d.my;h=l;k(l,"mouseDown")},q=function(){if(n)k(n,"dragComplete"),n=h=void 0;else{var a=Date.now();200<a-y?l==h&&k(l,"click"):l==h&&k(l,"doubleClick");h=void 0;y=a}k(l,"mouseUp")},A=function(a){var e=0,s=0,g=c;do e+=g.offsetLeft,s+=g.offsetTop;while(g=g.offsetParent);d.mx=a.pageX-e;d.my=a.pageY-s;a:{for(a=f.length-1;0<=a;a--)if(f[a].mouse&&f[a].enabled){a=f[a];break a}a=b}a!=l&&(k(a,"mouseOver"),k(l,"mouseOut"));l=a;window.document.body.style.cursor=
l!=b?"pointer":"default";h&&h.draggable&&(void 0==n?(n=h,k(h,"dragStart")):(h.x+=d.mx-d.dx,h.y+=d.my-d.dy,d.dy=d.my,d.dx=d.mx,k(h,"dragChange")));r?(r=!1,k(b,"stageEnter")):k(a,"mouseMove")},B=function(){r=!0},C=function(){k(b,"stageLeave")},k=function(a,b){for(var c=a;a;){if(a["_"+b])a["_"+b](F(b,c,a));a=a.parent}},F=function(a,c,e){a=new JS3Event(a,c,e,d.mx,d.my);c==b&&(a.target.name="Stage");return a};window.onfocus=function(){b._windowFocusIn&&b._windowFocusIn(new JS3Event("focusIn",b,b))};window.onblur=
function(){b._windowFocusOut&&b._windowFocusOut(new JS3Event("focusOut",b,b))};var u=function(){d.fillStyle=w;d.fillRect(0,0,e,o)},E=function(a){a.start=Date.now();m.push(a)},D=function(a){for(var b=j.length-1;0<=b;b--)a==j[b].f&&j.splice(b,1)};JS3.func.push(function(){for(var a=0;a<m.length;a++){t=m[a];if(0==t.elapsed&&void 0!=t.onStart)t.onStart();t.elapsed=Date.now()-t.start;for(p in t.props)t.object[p]=t.easeFunc(t.elapsed,t.props[p].a,t.props[p].b,t.duration);if(t.elapsed>=t.duration){m.splice(a,
1);t.object.isTweening=!1;for(p in t.props)t.object[p]=t.props[p].a+t.props[p].b;if(void 0!=t.onComplete)t.onComplete()}}for(var a=Date.now(),b=0;b<j.length;b++){var c=j[b];if(void 0===c.d||a-c.t>1E3*c.d)c.f(),c.t=a,void 0!=c.r&&(c.r--,0==c.r&&(D(c.f),void 0!=c.o&&c.o()))}v&&u();for(i=0;i<f.length;)a=f[i],a.update(a),i++;for(;g.length;)a=g[0],a.update(a),g.splice(0,1)})}JS3.getRandomColor=function(){return"#"+Math.round(16777215*Math.random()).toString(16)};
JS3.getRandomValue=function(a,b){return void 0==a?Math.random():void 0==b?Math.random()*a:Math.random()*(b-a)+a};JS3.drawLine=function(a){a.cx=(a.x1+a.x2)/2;a.cy=(a.y1+a.y2)/2;JS3.openShape(a);a.stage.moveTo(a.x1-a.cx,a.y1-a.cy);a.stage.lineTo(a.x2-a.cx,a.y2-a.cy);JS3.drawShape(a)};
JS3.drawArc=function(a){a.cx=(a.x1+a.x2)/2;a.cy=(a.y1+a.y2)/2;JS3.openShape(a);a.stage.moveTo(a.x1-a.cx,a.y1-a.cy);a.stage.quadraticCurveTo(a.xc-a.cx,a.yc-a.cy,a.x2-a.cx,a.y2-a.cy);a.mouse=a.stage.isPointInPath(a.stage.mx,a.stage.my);JS3.stroke(a);a.stage.restore()};JS3.drawRect=function(a){JS3.getCntrPt(a);JS3.openShape(a);a.stage.rect(-a.cx,-a.cy,2*a.cx,2*a.cy);JS3.drawShape(a)};
JS3.drawCirc=function(a){JS3.getCntrPt(a);var b=0.5522848*a.cx,c=0.5522848*a.cy;JS3.openShape(a);a.stage.moveTo(-a.cx,0);a.stage.bezierCurveTo(-a.cx,-c,-b,-a.cy,0,-a.cy);a.stage.bezierCurveTo(b,-a.cy,a.cx,-c,a.cx,0);a.stage.bezierCurveTo(a.cx,c,b,a.cy,0,a.cy);a.stage.bezierCurveTo(-b,a.cy,-a.cx,c,-a.cx,0);JS3.drawShape(a)};
JS3.drawTri=function(a){6==a.pts.length?JS3.drawTriByPoints(a):a.width==a.height?JS3.drawTriEquilateral(a):JS3.drawTriDistorted(a);JS3.openShape(a);a.stage.moveTo(a._x1,a._y1);a.stage.lineTo(a._x2,a._y2);a.stage.lineTo(a._x3,a._y3);a.stage.lineTo(a._x1,a._y1);JS3.drawShape(a)};JS3.drawTriEquilateral=function(a){var b=a.width||a.size,c=(a.height||a.size)*(Math.sqrt(3)/2);a._x1=0;a._y1=-2*c/3;a._x2=b/2;a._y2=c/3;a._x3=-b/2;a._y3=c/3;a.cx=b/2;a.cy=c/2+c/2/3};
JS3.drawTriDistorted=function(a){var b=a.width||a.size,c=a.height||a.size;a._x1=0;a._y1=-c/2;a._x2=b/2;a._y2=c/2;a._x3=-b/2;a._y3=c/2;a.cx=b/2;a.cy=c/2};JS3.drawTriByPoints=function(a){a.cx=(a.pts[0]+a.pts[2]+a.pts[4])/3;a.cy=(a.pts[1]+a.pts[3]+a.pts[5])/3;a._x1=a.pts[0]-a.cx;a._y1=a.pts[1]-a.cy;a._x2=a.pts[2]-a.cx;a._y2=a.pts[3]-a.cy;a._x3=a.pts[4]-a.cx;a._y3=a.pts[5]-a.cy};
JS3.drawImage=function(a){!1!=a.image.src&&(a.cx=a.image.width/2,a.cy=a.image.height/2,JS3.openShape(a),a.stage.rect(-a.cx,-a.cy,2*a.cx,2*a.cy),a.stage.drawImage(a.image,-a.cx,-a.cy),JS3.drawShape(a))};JS3.drawText=function(a){var b=a.bold?"Bold ":"",b=b+(a.italic?"Italic ":"");a.stage.font=b+a.size+"pt "+a.font;a.stage.textAlign="left";a.stage.textBaseline="top";a.cy=JS3getTextHeight(a)/2;a.cx=a.stage.measureText(a.text).width/2;JS3.openShape(a);a.fill&&JS3.fill(a);a.stroke&&JS3.stroke(a);JS3.drawShape(a)};
JS3.fill=function(a){a.stage.globalAlpha=a.alpha*a.fillAlpha;a.stage.fillStyle=a.color||a.fillColor;a instanceof JS3Text?a.stage.fillText(a.text,-a.cx,-a.cy):a.stage.fill();a.stage.globalAlpha=1};JS3.stroke=function(a){a.stage.globalAlpha=a.alpha*a.strokeAlpha;a.stage.lineCap=a.capStyle;a.stage.lineWidth=a.strokeWidth;a.stage.strokeStyle=a.strokeColor;a instanceof JS3Text?a.stage.strokeText(a.text,-a.cx,-a.cy):a.stage.stroke();a.stage.globalAlpha=1};
JS3.getCntrPt=function(a){a.cx=a.width/2||a.size/2;a.cy=a.height/2||a.size/2};JS3.openShape=function(a){a.stage.save();a.stage.globalAlpha=a.alpha;a.stage.translate(a.x+a.cx,a.y+a.cy);a.stage.scale(a.scaleX,a.scaleY);a.stage.rotate(a.rotation*Math.PI/180);a.stage.beginPath()};JS3.drawShape=function(a){a.stage.closePath();a.mouse=a.stage.isPointInPath(a.stage.mx,a.stage.my);a.fill&&JS3.fill(a);a.stroke&&JS3.stroke(a);a.stage.restore()};JS3.copyProps=function(a,b){for(var c in a)b[c]=a[c]};
linear=function(a,b,c,d){return c*a/d+b};easeInQuad=function(a,b,c,d){a/=d;return c*a*a+b};easeOutQuad=function(a,b,c,d){a/=d;return-c*a*(a-2)+b};easeInOutQuad=function(a,b,c,d){a/=d/2;if(1>a)return c/2*a*a+b;a--;return-c/2*(a*(a-2)-1)+b};easeInCubic=function(a,b,c,d){a/=d;return c*a*a*a+b};easeOutCubic=function(a,b,c,d){a/=d;a--;return c*(a*a*a+1)+b};easeInOutCubic=function(a,b,c,d){a/=d/2;if(1>a)return c/2*a*a*a+b;a-=2;return c/2*(a*a*a+2)+b};
easeInQuart=function(a,b,c,d){a/=d;return c*a*a*a*a+b};easeOutQuart=function(a,b,c,d){a/=d;a--;return-c*(a*a*a*a-1)+b};easeInOutQuart=function(a,b,c,d){a/=d/2;if(1>a)return c/2*a*a*a*a+b;a-=2;return-c/2*(a*a*a*a-2)+b};easeInQuint=function(a,b,c,d){a/=d;return c*a*a*a*a*a+b};easeOutQuint=function(a,b,c,d){a/=d;a--;return c*(a*a*a*a*a+1)+b};easeInOutQuint=function(a,b,c,d){a/=d/2;if(1>a)return c/2*a*a*a*a*a+b;a-=2;return c/2*(a*a*a*a*a+2)+b};
easeInSine=function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b};easeOutSine=function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b};easeInOutSine=function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b};easeInExpo=function(a,b,c,d){return c*Math.pow(2,10*(a/d-1))+b};easeOutExpo=function(a,b,c,d){return c*(-Math.pow(2,-10*a/d)+1)+b};easeInOutExpo=function(a,b,c,d){a/=d/2;if(1>a)return c/2*Math.pow(2,10*(a-1))+b;a--;return c/2*(-Math.pow(2,-10*a)+2)+b};
easeInCirc=function(a,b,c,d){a/=d;return-c*(Math.sqrt(1-a*a)-1)+b};easeOutCirc=function(a,b,c,d){a/=d;a--;return c*Math.sqrt(1-a*a)+b};easeInOutCirc=function(a,b,c,d){a/=d/2;if(1>a)return-c/2*(Math.sqrt(1-a*a)-1)+b;a-=2;return c/2*(Math.sqrt(1-a*a)+1)+b};JS3.func=[];JS3.loop=function(){JS3.getFrameRate();for(var a=0;a<JS3.func.length;a++)JS3.func[a]();window.getAnimFrame(JS3.loop)};
window.getAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();JS3.getFrameRate=function(){var a=window.mozAnimationStartTime||Date.now();5<a-JS3.FT&&(JS3.FR=1E3/(a-JS3.FT),JS3.FT=a)};
JS3.showFrameRate=function(a,b,c){if(!document.getElementById("JS3FR")){var d=0;yy=0;c&&(d=c.position.x,yy=c.position.y);a&&(d+=a);b&&(yy+=b);var e=document.createElement("div");e.setAttribute("id","JS3FR");e.style.position="absolute";e.style.left=d+"px";e.style.top=yy+"px";e.style.background="#333";e.style.border="1px solid #555";e.style.color="#00ff00";e.style.padding="10px";e.style.fontSize="16px";e.style.fontFamily="Arial,sans-serif";e.style.textShadow="1px 1px 0 #000";e.innerHTML="60.0 fps";
document.body.appendChild(e);setInterval(function(){var a=JS3.FR.toFixed(1);e.innerHTML=a+" fps";e.style.color=a<15?"#ff0000":a>=15&&a<=30?"#ffff00":"#00ff00"},1E3)}};JS3.FR=0;JS3.FT=Date.now()-1;window.getAnimFrame(JS3.loop);function JS3Line(a){JS3getBaseProps(this);JS3getLineProps(this);this.update=JS3.drawLine;a&&JS3.copyProps(a,this)}function JS3Arc(a){JS3getBaseProps(this);JS3getLineProps(this);this.update=JS3.drawArc;a&&JS3.copyProps(a,this)}
function JS3Tri(a){JS3getBaseProps(this);JS3getPolyProps(this);this.update=JS3.drawTri;a&&JS3.copyProps(a,this)}function JS3Rect(a){JS3getBaseProps(this);this.update=JS3.drawRect;a&&JS3.copyProps(a,this)}function JS3Circle(a){JS3getBaseProps(this);this.update=JS3.drawCirc;a&&JS3.copyProps(a,this)}function JS3Text(a){JS3getBaseProps(this);JS3getTextProps(this);this.update=JS3.drawText;a&&JS3.copyProps(a,this)}
function JS3Image(a){JS3getImageProps(this);this.update=JS3.drawImage;this.fill=this.stroke=!1;a&&JS3.copyProps(a,this)}
function JS3getBaseProps(a){Object.defineProperty(a,"size",{get:function(){return a._size},set:function(b){a._size=a.width=a.height=b}});Object.defineProperty(a,"width",{get:function(){return a._width},set:function(b){a._width=b;a.pts=[]}});Object.defineProperty(a,"height",{get:function(){return a._height},set:function(b){a._height=b;a.pts=[]}});a.x=a.y=a.rotation=0;a._size=25;a.fillColor="#ddd";a.strokeColor="#ccc";a.fill=a.stroke=!0;a.alpha=a.scaleX=a.scaleY=a.fillAlpha=a.strokeAlpha=1;a.strokeWidth=
2;JS3setObjEvents(a)}function JS3getLineProps(a){a.capStyle="butt";a.x1=a.y1=a.cx=a.cy=a.x2=a.y2=0;Object.defineProperty(a,"color",{set:function(b){a.strokeColor=b}});Object.defineProperty(a,"thickness",{set:function(b){a.strokeWidth=b}})}
function JS3getPolyProps(a){a.pts=[];Object.defineProperty(a,"x1",{set:function(b){a.pts[0]=b}});Object.defineProperty(a,"y1",{set:function(b){a.pts[1]=b}});Object.defineProperty(a,"x2",{set:function(b){a.pts[2]=b}});Object.defineProperty(a,"y2",{set:function(b){a.pts[3]=b}});Object.defineProperty(a,"x3",{set:function(b){a.pts[4]=b}});Object.defineProperty(a,"y3",{set:function(b){a.pts[5]=b}})}
function JS3getImageProps(a){a.image=new Image;Object.defineProperty(a,"src",{set:function(b){a.image.src=b}});Object.defineProperty(a,"ready",{set:function(b){a.image.onload=b}});Object.defineProperty(a,"width",{get:function(){return a.image.width}});Object.defineProperty(a,"height",{get:function(){return a.image.height}});a.x=a.y=a.rotation=0;a.fillColor="#ddd";a.strokeColor="#ccc";a.fill=a.stroke=!0;a.alpha=a.scaleX=a.scaleY=a.fillAlpha=a.strokeAlpha=1;a.strokeWidth=2;JS3setObjEvents(a)}
function JS3getTextProps(a){a.size=12;a.font="Arial";a.color="#333";a.stroke=a.bold=a.italic=!1}function JS3getTextHeight(a){var b=document.getElementsByTagName("body")[0],c=document.createElement("div");c.appendChild(document.createTextNode("M"));c.setAttribute("style","font-family:"+a.font+"; font-size:"+a.size+"pt; line-height:normal");b.appendChild(c);a=c.offsetHeight;b.removeChild(c);return a}
function JS3setObjEvents(a){Object.defineProperty(a,"down",{set:function(b){a._mouseDown=b;a.enabled=!0}});Object.defineProperty(a,"up",{set:function(b){a._mouseUp=b;a.enabled=!0}});Object.defineProperty(a,"over",{set:function(b){a._mouseOver=b;a.enabled=!0}});Object.defineProperty(a,"out",{set:function(b){a._mouseOut=b;a.enabled=!0}});Object.defineProperty(a,"click",{set:function(b){a._click=b;a.enabled=!0}});Object.defineProperty(a,"dclick",{set:function(b){a._doubleClick=b;a.enabled=!0}});Object.defineProperty(a,
"draggable",{get:function(){return a._draggable},set:function(b){a._draggable=b;!0==b&&(a.enabled=!0)}});Object.defineProperty(a,"dragStart",{set:function(b){a._dragStart=b;a.draggable=!0}});Object.defineProperty(a,"dragChange",{set:function(b){a._dragChange=b;a.draggable=!0}});Object.defineProperty(a,"dragComplete",{set:function(b){a._dragComplete=b;a.draggable=!0}})}
function JS3setStageEvents(a){Object.defineProperty(a,"down",{set:function(b){a._mouseDown=b}});Object.defineProperty(a,"up",{set:function(b){a._mouseUp=b}});Object.defineProperty(a,"move",{set:function(b){a._mouseMove=b}});Object.defineProperty(a,"click",{set:function(b){a._click=b}});Object.defineProperty(a,"dclick",{set:function(b){a._doubleClick=b}});Object.defineProperty(a,"enter",{set:function(b){a._stageEnter=b}});Object.defineProperty(a,"leave",{set:function(b){a._stageLeave=b}});Object.defineProperty(a,
"focusIn",{set:function(b){a._windowFocusIn=b}});Object.defineProperty(a,"focusOut",{set:function(b){a._windowFocusOut=b}})}function JS3Event(a,b,c,d,e){this.x=d;this.y=e;this.type=a;this.target=b;this.owner=c}function JS3Tween(a,b,c){this.object=a;this.duration=1E3*b;this.delay=c.delay;this.elapsed=this.start=0;this.onStart=c.onStart;this.onComplete=c.onComplete;this.easeFunc=c.ease||linear;this.props={};for(var d in c)JS3isNumber(c[d])&&(this.props[d]={a:a[d],b:c[d]-a[d]})}
function JS3Runner(a,b,c,d){this.f=a;this.d=b;this.r=c;this.o=d;this.t=Date.now();Object.defineProperty(this,"delay",{set:function(a){this.d=a}});Object.defineProperty(this,"onComplete",{set:function(a){this.o=a}});Object.defineProperty(this,"repeatCount",{set:function(a){this.r=a}})}function JS3Trace(a){try{console.log(a)}catch(b){}}function JS3isNumber(a){return!isNaN(parseFloat(a))&&isFinite(a)}if(void 0==trace)var trace=JS3Trace;