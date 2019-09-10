var startTime = performance.now();
var duration = 1000, delay = 3000;
var easing = function (t) { return t; };
function frame () {
	var now = performance.now();
	var t = 0;
	if (startTime + delay < now) {
		t = (now - startTime - delay) / duration;
		t = Math.min(1, t);
		t = easing(t);
	}
	console.log(t);
	if (t < 1) requestAnimationFrame(frame);
}
frame();
