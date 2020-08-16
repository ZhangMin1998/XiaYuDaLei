var canvas = document.getElementById('dowebok');
var ctx = canvas.getContext('2d');


var stgw = 1280;
var stgh = 720;


var loffset = 0;
var toffset = 0;

function _pexresize() {
	var cw = window.innerWidth;
	var ch = window.innerHeight;
	if (cw <= ch * stgw / stgh) {
		loffset = 0;
		toffset = Math.floor(ch - (cw * stgh / stgw)) / 2;
		canvas.style.width = cw + "px";
		canvas.style.height = Math.floor(cw * stgh / stgw) + "px";
	} else {
		loffset = Math.floor(cw - (ch * stgw / stgh)) / 2;
		toffset = 0;
		canvas.style.height = ch + "px";
		canvas.style.width = Math.floor(ch * stgw / stgh) + "px";
	}
	canvas.style.marginLeft = loffset + "px";
	canvas.style.marginTop = toffset + "px";
}
_pexresize();

var count = 100;
var lcount = 6;

var layer = [];
var layery = [];

ctx.fillStyle = "rgba(255,255,255,0.5)";
for (var l = 0; l < lcount; l++) {
	ctx.clearRect(0, 0, stgw, stgh);
	for (var i = 0; i < count * (lcount - l) / 1.5; i++) {
		var myx = Math.floor(Math.random() * stgw);
		var myy = Math.floor(Math.random() * stgh);
		var myh = l * 6 + 8;
		var myw = myh / 10;
		ctx.beginPath();
		ctx.moveTo(myx, myy);
		ctx.lineTo(myx + myw, myy + myh);
		ctx.arc(myx, myy + myh, myw, 0, 1 * Math.PI);
		ctx.lineTo(myx - myw, myy + myh);
		ctx.closePath();
		ctx.fill();
	}
	layer[l] = new Image();
	layer[l].src = canvas.toDataURL("image/png");
	layery[l] = 0;
}

var stt = 0;
var str = Date.now() + Math.random() * 4000;
var stact = false;

function animate() {
	ctx.clearRect(0, 0, stgw, stgh);

	for (var l = 0; l < lcount; l++) {
		layery[l] += (l + 1.5) * 5;
		if (layery[l] > stgh) {

			layery[l] = layery[l] - stgh;
		}
		ctx.drawImage(layer[l], 0, layery[l]);
		ctx.drawImage(layer[l], 0, layery[l] - stgh);
	}
	if (Date.now() > str) {
		stact = true;
	}
	if (stact) {
		stt++;
		if (stt < 5 + Math.random() * 10) {
			var ex = stt / 30;
		} else {
			var ex = (stt - 10) / 30;
		}
		if (stt > 20) {
			stt = 0;
			stact = false;
			str = Date.now() + Math.random() * 8000 + 2000;
		}

		ctx.fillStyle = "rgba(255,255,255," + ex + ")";
		ctx.fillRect(0, 0, stgw, stgh);
	}
	window.requestAnimationFrame(animate);
}

animate();