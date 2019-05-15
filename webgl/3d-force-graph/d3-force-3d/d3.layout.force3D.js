 // layoutWorker.worker.js 36214
 var r = d3;
 if (!r)
     throw "force3D: Unable to inject d3.layout.force3D into d3.js . Be sure to load D3js beforehand.";
 r.layout || r.geom || (r.layout = {},
     r.geom = {});
 var i = Math.abs,
     o = 0;

 function a(t) {
     return t[0]
 }

 function s(t) {
     return t[1]
 }

 function u(t) {
     return t[2]
 }

 function c(t) {
     return "function" == typeof t ? t : function() {
         return t
     }
 }

 function f(t) {
     return t.x
 }

 function l(t) {
     return t.y
 }

 function h(t) {
     return t.z
 }
 // 八叉树
 r.geom.octree = function(t, e, n, r, d, p, m) {
     var v, g = a,
         y = s,
         b = u;
     if (v = arguments.length)
         return g = f,
             y = l,
             b = h,
             4 === v && (p = n,
                 d = e,
                 m = r,
                 r = n = e = 0),
             _(t);

     function _(t) {
         var a, s, u, f, l, h, _, x, w, M, E, T, S = c(g),
             O = c(y),
             A = c(b);
         if (null != e)
             _ = e,
             x = n,
             w = r,
             M = d,
             E = p,
             T = m;
         else if (M = E = T = -(_ = x = w = 1 / 0),
             f = [],
             l = [],
             h = [],
             u = t.length,
             v)
             for (s = 0; s < u; ++s)
                 (a = t[s]).x < _ && (_ = a.x),
                 a.y < x && (x = a.y),
                 a.z < w && (w = a.z),
                 a.x > M && (M = a.x),
                 a.y > E && (E = a.y),
                 a.z > T && (T = a.z),
                 f.push(a.x),
                 l.push(a.y),
                 h.push(a.z);
         else
             for (s = 0; s < u; ++s) {
                 var L = +S(a = t[s], s),
                     R = +O(a, s),
                     C = +A(a, s);
                 L < _ && (_ = L),
                     R < x && (x = R),
                     C < w && (w = C),
                     L > M && (M = L),
                     R > E && (E = R),
                     C > T && (T = C),
                     f.push(L),
                     l.push(R),
                     h.push(C)
             }
         var j = M - _,
             P = E - x,
             N = T - w;

         function I(t, e, n, r, o, a, s, u, c, f, l) {
             if (!(isNaN(n) || isNaN(r) || isNaN(o)))
                 if (t.leaf) {
                     var h = t.x,
                         d = t.y,
                         p = t.z;
                     if (null != h)
                         if (i(h - n) + i(d - r) + i(p - o) < .01)
                             D(t, e, n, r, o, a, s, u, c, f, l);
                         else {
                             var m = t.point;
                             t.x = t.y = t.z = t.point = null,
                                 D(t, m, h, d, p, a, s, u, c, f, l),
                                 D(t, e, n, r, o, a, s, u, c, f, l)
                         }
                     else
                         t.x = n,
                         t.y = r,
                         t.z = o,
                         t.point = e
                 } else
                     D(t, e, n, r, o, a, s, u, c, f, l)
         }

         function D(t, e, n, r, i, a, s, u, c, f, l) {
             var h = .5 * (a + c),
                 d = .5 * (s + f),
                 p = .5 * (u + l),
                 m = n >= h,
                 v = r >= d,
                 g = i >= p,
                 y = g << 2 | v << 1 | m;
             t.leaf = !1,
                 t = t.nodes[y] || (t.nodes[y] = {
                     leaf: !0,
                     nodes: [],
                     point: null,
                     x: null,
                     y: null,
                     z: null,
                     add: function(t) {
                         I(U, t, +S(t, ++s), +O(t, s), +A(t, s), _, x, w, M, E, T)
                     }
                 }),
                 m ? a = h : c = h,
                 v ? s = d : f = d,
                 g ? u = p : l = p,
                 ++o > 500 ? (o = 0,
                     setTimeout(function() {
                         I(t, e, n, r, i, a, s, u, c, f, l)
                     }, 5)) : I(t, e, n, r, i, a, s, u, c, f, l)
         }
         j >= P && j >= N ? (E = x + j,
             T = w + j) : P >= N && P >= j ? (M = _ + P,
             T = w + P) : (M = _ + N,
             E = x + N);
         var U = {
             leaf: !0,
             nodes: [],
             point: null,
             x: null,
             y: null,
             z: null,
             add: function(t) {
                 I(U, t, +S(t, ++s), +O(t, s), +A(t, s), _, x, w, M, E, T)
             }
         };
         if (U.visit = function(t) {
                 ! function t(e, n, r, i, o, a, s, u) {
                     if (!e(n, r, i, o, a, s, u)) {
                         var c = .5 * (r + a),
                             f = .5 * (i + s),
                             l = .5 * (o + u),
                             h = n.nodes;
                         h[0] && t(e, h[0], r, i, o, c, f, l),
                             h[1] && t(e, h[1], c, i, o, a, f, l),
                             h[2] && t(e, h[2], r, f, o, c, s, l),
                             h[3] && t(e, h[3], c, f, o, a, s, l),
                             h[4] && t(e, h[4], r, i, l, c, f, u),
                             h[5] && t(e, h[5], c, i, l, a, f, u),
                             h[6] && t(e, h[6], r, f, l, c, s, u),
                             h[7] && t(e, h[7], c, f, l, a, s, u)
                     }
                 }(t, U, _, x, w, M, E, T)
             },
             U.find = function(t) {
                 return function(t, e, n, r, i, o, a, s, u, c) {
                     var f, l = 1 / 0;
                     return function t(h, d, p, m, v, g, y) {
                             if (!(d > s || p > u || m > c || v < i || g < o || y < a)) {
                                 if (b = h.point) {
                                     var b, _ = e - h.x,
                                         x = n - h.y,
                                         w = r - h.z,
                                         M = _ * _ + x * x + w * w;
                                     if (M < l) {
                                         var E = Math.sqrt(l = M);
                                         i = e - E,
                                             o = n - E,
                                             a = r - E,
                                             s = e + E,
                                             u = n + E,
                                             c = r + E,
                                             f = b
                                     }
                                 }
                                 for (var T = h.nodes, S = .5 * (d + v), O = .5 * (p + g), A = .5 * (m + y), L = (r >= A) << 2 | (n >= O) << 1 | e >= S, R = L + 8; L < R; ++L)
                                     if (h = T[7 & L])
                                         switch (7 & L) {
                                             case 0:
                                                 t(h, d, p, m, S, O, A);
                                                 break;
                                             case 1:
                                                 t(h, S, p, m, v, O, A);
                                                 break;
                                             case 2:
                                                 t(h, d, O, m, S, g, A);
                                                 break;
                                             case 3:
                                                 t(h, S, O, m, v, g, A);
                                                 break;
                                             case 4:
                                                 t(h, d, p, A, S, O, y);
                                                 break;
                                             case 5:
                                                 t(h, S, p, A, v, O, y);
                                                 break;
                                             case 6:
                                                 t(h, d, O, A, S, g, y);
                                                 break;
                                             case 7:
                                                 t(h, S, O, A, v, g, y)
                                         }
                             }
                         }(t, i, o, a, s, u, c),
                         f
                 }(U, t[0], t[1], t[2], _, x, w, M, E, T)
             },
             s = -1,
             null == e) {
             for (; ++s < u;)
                 I(U, t[s], f[s], l[s], h[s], _, x, w, M, E, T);
             --s
         } else
             t.forEach(U.add);
         return f = l = h = t = a = null,
             U
     }
     return _.x = function(t) {
             return arguments.length ? (g = t,
                 _) : g
         },
         _.y = function(t) {
             return arguments.length ? (y = t,
                 _) : y
         },
         _.z = function(t) {
             return arguments.length ? (b = t,
                 _) : b
         },
         _.extent = function(t) {
             return arguments.length ? (null == t ? e = n = r = d = p = m = null : (e = +t[0][0],
                     n = +t[0][1],
                     r = +t[0][2],
                     d = +t[1][0],
                     p = +t[1][1],
                     m = +t[1][2]),
                 _) : null == e ? null : [
                 [e, n, r],
                 [d, p, m]
             ]
         },
         _.size = function(t) {
             return arguments.length ? (null == t ? e = n = r = d = p = m = null : (e = n = r = 0,
                     d = +t[0],
                     p = +t[1],
                     m = +t[1]),
                 _) : null == e ? null : [d - e, p - n, m - r]
         },
         _
 };
 r.layout.force3D = function() {
     var t, e, n, i, a = {},
         s = r.dispatch("start", "tick", "end"),
         u = [1, 1, 1],
         c = .9,
         f = 20,
         l = 1,
         h = -30,
         d = 1 / 0,
         p = .1,
         m = 1,
         v = .64,
         g = [],
         y = [];

     function b(t) {
         return function(e, n, r, i, o) {
             if (e.point !== t) {
                 var a = e.cx - t.x,
                     s = e.cy - t.y,
                     u = e.cz - t.z,
                     c = o - n,
                     f = a * a + s * s + u * u;
                 if (c * c / v < f) {
                     if (f < d) {
                         var l = e.charge / f;
                         t.px -= a * l,
                             t.py -= s * l,
                             t.pz -= u * l
                     }
                     return !0
                 }
                 if (e.point && f && f < d) {
                     l = e.pointCharge / f;
                     t.px -= a * l,
                         t.py -= s * l,
                         t.pz -= u * l
                 }
             }
             return !e.charge
         }
     }
     return a.tick = function() {
             if (0 === t)
                 return !0;
             if ((t *= .99) < .005)
                 return s.call("end", {
                         type: "end",
                         alpha: t = 0
                     }),
                     o = 0,
                     !0;
             var a, f, l, d, v, _, x, w, M, E, T = g.length,
                 S = y.length;
             for (f = 0; f < S; ++f)
                 d = (l = y[f]).source,
                 (_ = (w = (v = l.target).x - d.x) * w + (M = v.y - d.y) * M + (E = v.z - d.z) * E) && (w *= _ = t * n[f] * ((_ = Math.sqrt(_)) - e[f]) / _,
                     M *= _,
                     E *= _,
                     v.x -= w * (x = d.weight / (v.weight + d.weight)),
                     v.y -= M * x,
                     v.z -= E * x,
                     d.x += w * (x = 1 - x),
                     d.y += M * x,
                     d.z += E * x);
             if ((x = t * p) && (w = u[0] / 2,
                     M = u[1] / 2,
                     E = u[2] / 2,
                     f = -1,
                     x))
                 for (; ++f < T;)
                     (l = g[f]).x += (w - l.x) * x,
                     l.y += (M - l.y) * x,
                     l.z += (E - l.z) * x * m;
             if (h)
                 for (! function t(e, n, r) {
                         var i = 0,
                             o = 0,
                             a = 0;
                         if (e.charge = 0,
                             !e.leaf)
                             for (var s, u = e.nodes, c = u.length, f = -1; ++f < c;)
                                 null != (s = u[f]) && (t(s, n, r),
                                     e.charge += s.charge,
                                     i += s.charge * s.cx,
                                     o += s.charge * s.cy,
                                     a += s.charge * s.cz);
                         if (e.point) {
                             e.leaf || (e.point.x += Math.random() - .5,
                                 e.point.y += Math.random() - .5,
                                 e.point.z += Math.random() - .5);
                             var l = n * r[e.point.index];
                             e.charge += e.pointCharge = l,
                                 i += l * e.point.x,
                                 o += l * e.point.y,
                                 a += l * e.point.z
                         }
                         e.cx = i / e.charge,
                             e.cy = o / e.charge,
                             e.cz = a / e.charge
                     }(a = r.geom.octree(g), t, i),
                     f = -1; ++f < T;)
                     (l = g[f]).fixed || a.visit(b(l));
             for (f = -1; ++f < T;)
                 (l = g[f]).fixed ? (l.x = l.px,
                     l.y = l.py,
                     l.z = l.pz) : (l.x -= (l.px - (l.px = l.x)) * c,
                     l.y -= (l.py - (l.py = l.y)) * c,
                     l.z -= (l.pz - (l.pz = l.z)) * c);
             s.call("tick", {
                 type: "tick",
                 alpha: t
             })
         },
         a.nodes = function(t) {
             return arguments.length ? (g = t,
                 a) : g
         },
         a.links = function(t) {
             return arguments.length ? (y = t,
                 a) : y
         },
         a.size = function(t) {
             return arguments.length ? (u = t,
                 a) : u
         },
         a.on = function(t, e) {
             return "function" == typeof e ? s.on(t, function(t) {
                     e(t)
                 }) : s.on(t, null),
                 a
         },
         a.linkDistance = function(t) {
             return arguments.length ? (f = "function" == typeof t ? t : +t,
                 a) : f
         },
         a.distance = a.linkDistance,
         a.linkStrength = function(t) {
             return arguments.length ? (l = "function" == typeof t ? t : +t,
                 a) : l
         },
         a.friction = function(t) {
             return arguments.length ? (c = +t,
                 a) : c
         },
         a.charge = function(t) {
             return arguments.length ? (h = "function" == typeof t ? t : +t,
                 a) : h
         },
         a.chargeDistance = function(t) {
             return arguments.length ? (d = t * t,
                 a) : Math.sqrt(d)
         },
         a.gravity = function(t) {
             return arguments.length ? (p = +t,
                 a) : p
         },
         a.heightCompress = function(t) {
             return arguments.length ? (m = +t,
                 a) : m
         },
         a.theta = function(t) {
             return arguments.length ? (v = t * t,
                 a) : Math.sqrt(v)
         },
         a.alpha = function(e) {
             return arguments.length ? (e = +e,
                 t ? t = e > 0 ? e : 0 : e > 0 && (s.call("start", {
                         type: "start",
                         alpha: t = e
                     }),
                     r.timer(a.tick)),
                 a) : t
         },
         a.start = function() {
             o = 0;
             var t, r, s, c = g.length,
                 d = y.length,
                 p = u[0],
                 m = u[1],
                 v = u[2];
             for (t = 0; t < c; ++t)
                 (s = g[t]).index = t,
                 s.weight = 0;
             for (t = 0; t < d; ++t)
                 "number" == typeof(s = y[t]).source && (s.source = g[s.source]),
                 "number" == typeof s.target && (s.target = g[s.target]),
                 ++s.source.weight,
                 ++s.target.weight;
             for (t = 0; t < c; ++t)
                 s = g[t],
                 isNaN(s.x) && (s.x = b("x", p)),
                 isNaN(s.y) && (s.y = b("y", m)),
                 isNaN(s.z) && (s.z = b("z", v)),
                 isNaN(s.px) && (s.px = s.x),
                 isNaN(s.py) && (s.py = s.y),
                 isNaN(s.pz) && (s.pz = s.z);
             if (e = [],
                 "function" == typeof f)
                 for (t = 0; t < d; ++t)
                     e[t] = +f.call(this, y[t], t);
             else
                 for (t = 0; t < d; ++t)
                     e[t] = f;
             if (n = [],
                 "function" == typeof l)
                 for (t = 0; t < d; ++t)
                     n[t] = +l.call(this, y[t], t);
             else
                 for (t = 0; t < d; ++t)
                     n[t] = l;
             if (i = [],
                 "function" == typeof h)
                 for (t = 0; t < c; ++t)
                     i[t] = +h.call(this, g[t], t);
             else
                 for (t = 0; t < c; ++t)
                     i[t] = h;

             function b(e, n) {
                 if (!r) {
                     for (r = new Array(c),
                         s = 0; s < c; ++s)
                         r[s] = [];
                     for (s = 0; s < d; ++s) {
                         var i = y[s];
                         r[i.source.index].push(i.target),
                             r[i.target.index].push(i.source)
                     }
                 }
                 for (var o, a = r[t], s = -1, u = a.length; ++s < u;)
                     if (!isNaN(o = a[s][e]))
                         return o;
                 return Math.random() * n
             }
             return a.resume()
         },
         a.resume = function() {
             return a.alpha(.1)
         },
         a.stop = function() {
             return a.alpha(0)
         },
         a
 };