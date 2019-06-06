/**
 * 注入 CSS，可将 css 和 js 一起打包成一个js文件；开发一些库时使用方便
 * 参考：https://github.com/anvaka/ngraph.forcelayout 做法
 */
function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".graph-nav-info {\n  bottom: 5px;\n  width: 100%;\n  text-align: center;\n  color: slategrey;\n  opacity: 0.7;\n  font-size: 10px;\n}\n\n.graph-info-msg {\n  top: 50%;\n  width: 100%;\n  text-align: center;\n  color: lavender;\n  opacity: 0.7;\n  font-size: 22px;\n}\n\n.graph-tooltip {\n  color: lavender;\n  font-size: 18px;\n  transform: translate(-50%, 25px);\n}\n\n.graph-info-msg, .graph-nav-info, .graph-tooltip {\n  position: absolute;\n  font-family: Sans-serif;\n}\n\n.grabbable {\n  cursor: move;\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n\n.grabbable:active {\n  cursor: grabbing;\n  cursor: -moz-grabbing;\n  cursor: -webkit-grabbing;\n}";
  styleInject(css);