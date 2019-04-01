(function(){
    function quadraticAt(p0, p1, p2, t) {
      var onet = 1 - t;
      return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
    }
    function quadraticDerivativeAt(p0, p1, p2, t) {
      return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
    }
    function bezier2(t, p0, p1, p2, p3){
        var at = 1 - t;
        return p0 * at * at * at +
                p1 * 3 * t * at * at +
                p2 * 3 * t * t * at +
                p3 * t * t * t;
    }
    //三次贝塞尔曲线
    function bezier(u, p0, p1, p2, p3) {
        return Math.pow(u, 3)
            * (p3 + 3 * (p1 - p2) - p0)
            + 3 * Math.pow(u, 2)
            * (p0 - 2 * p1 + p2)
            + 3 * u
            * (p1 - p0) + p0;
    }
    //二次贝塞尔曲线
    function quadratic(u, p0, p1, p2) {
        u = Math.max(Math.min(1.0, u), 0.0);
        return Math.pow((1.0 - u), 2) * p0
            + 2 * u * (1.0 - u) * p1
            + u * u * p2;
    }
    var points = [];
    points.push(
        {x: 20, y: 50},
        {x: 200, y: 80},
        {x: 20, y: 150},
        {x: 200, y: 70}
    );

    function spline(start, end){
        var smoothing = .5;
        var p0 = {x: start.x, y: start.y},
            p1 = {x: (start.x + end.x) * smoothing, y: start.y},//cp1
            p2 = {x: p1.x, y: end.y},//cp2
            p3 = {x: end.x, y: end.y};//
        return {
            p0: p0,
            p1: p1,
            p2: p2,
            p3: p3
        };
    }
    var lerpQuadratic = function(p0, p1, p2, t){
        return [
            quadratic(t, p0.x, p1.x, p2.x),
            quadratic(t, p0.y, p1.y, p2.y)
        ];
    };
    var lerpBezier = function(p0, p1, p2, p3, t){
        return [
            bezier(t, p0.x, p1.x, p2.x, p3.x),
            bezier(t, p0.y, p1.y, p2.y, p3.y)
        ];
    }
    var fly = function(t, p, p2) {
        var l = 200;
        //var p = t * l;//path.getPointAtLength(t * l);

        var t2 = Math.min(t + 0.05, 1);
        //var p2 = t2 * l;// path.getPointAtLength(t2 * l);

        var x = p2.x - p.x;
        var y = p2.y - p.y;
        var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;

        var s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);

        return {
            translate: [p.x, p.y],
            scale: s,
            rotate: r
        };// "translate(" + p.x + "," + p.y + ") scale(" + s + ") rotate(" + r + ")";
    }
    function draw(t){
        for(var i = 0; i < points.length; i += 2){
            var start = points[i],
                end = points[i + 1];
            var bezier = spline(start, end);
            var p0 = bezier.p0,
                p1 = bezier.p1,
                p2 = bezier.p2,
                p3 = bezier.p3;
            //console.log(start, end)
            
            var bezierPoint = lerpQuadratic(p0, p1, p3, t);//[0, 3], [.3, .6] [1]
            //var bezierPoint = lerpBezier(p0, p1, p2, p3, t);
            //var bezierPointN = getBezier(p0, p1, p2, p3, t+0.01);
            var x = bezierPoint[0];
            var y = bezierPoint[1];
            //var dx = bezierPointN[0];
            //var dy = bezierPointN[1];

            // 法向量
            /*var tempVar = (p3.y-p0.y) / (p3.x-p0.x);
            var ny = Math.sqrt(1 / (1 + (tempVar*tempVar) ));
            var nx = -ny*tempVar;*/

            ctx.strokeStyle = "rgba(166,200,76,1)";
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            //ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
            ctx.quadraticCurveTo(p1.x, p1.y, p3.x, p3.y);
            //ctx.lineTo(p3.x+nx*width, p3.y+ny*width);
            //ctx.bezierCurveTo(p2.x+nx*width, p2.y+ny*width, p1.x+nx*width, p1.y+ny*width, p0.x+nx*width, p0.y+ny*width);
            ctx.stroke();
            
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, y);
            //var transform = fly(t, p0, p3);
            //ctx.translate(x, y);
            //ctx.translate(transform.translate[0], transform.translate[1]);
            //ctx.scale(transform.scale, transform.scale);
            //ctx.rotate(transform.rotate, transform.rotate);
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            /*var plane = "M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
            var plane = "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z";
            var p = new Path2D(plane);*/
            
            //console.log(transform)
            ctx.fill();
            ctx.restore();
            /*ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();*/
            //ctx.restore();
            //var rotation = Math.atan((dy-y)/(dx-x));

            //item.pivot.x = 180;
            //item.pivot.y = 2;
            /*if(dx>x) {
            item.rotation = rotation;
            }else {
            item.rotation = rotation+Math.PI;
            }
            item.x = x;
            item.y = y;*/

        }
    }
    var time = 0;
    var canvas = document.getElementById("city"),
        ctx = canvas.getContext("2d");
    //loop();
    (function frame(){
        time++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(time % 200 / 200);
        if(time >= 200){
            time = 0;
        }
        else
            requestAnimationFrame(frame);
    })();
    //draw(0);
})();