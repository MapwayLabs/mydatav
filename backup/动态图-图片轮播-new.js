
var jsFileUrl = chart.info.resourceUrl[0];
var charSetting = chart.info.meta.custom_chart_setting.charSetting;
var imgWidth = charSetting.imgWidth || 234;  // 图片宽度
var imgHeight = charSetting.imgHeight || 106;  // 图片高度
var imgMargin = charSetting.imgMargin || 16; // 图片距离文字的高度
var slidesToShow = 3; // 一次显示多少个
var slidesToScroll = charSetting.slidesToScroll || 3;  // 每次滚动多少个
var autoplay = !!charSetting.autoplay; // 是否自动播放
var infinite = !!charSetting.infinite;  // 是否循环播放
var initFunc = function() {
var data = chart.views[0].data.x;
var dataTemp = [];
data[0].data.forEach(function(item, index) {
    dataTemp.push([item, data[1].data[index]]);
});
var imgPics = dataTemp;
  var slider = $("<div></div>").addClass("info-slider").css({
  "margin-bottom": 0,
  });

  imgPics.forEach(function(data, idx) {
    var item = $("<li></li>"),
        img = $("<img>").attr({
          "src": data[0],
          "width": imgWidth,
          "height": imgHeight
        }).css({
          marginBottom: imgMargin
        }),
        title = $("<p>").text(data[1]).css({
          'text-align':'center',
          'color': charSetting.textColor || 'rgba(10,18,32,.64)',
          'font-size': (charSetting.textSize || 12) + 'px'
        });
    item.append(img).append(title);
    slider.append(item);
  });

  chart.$elem.append(slider);

  slider.slick({
      speed: charSetting.speed || 300,
      infinite: infinite,  // 是否循环播放
      slidesToShow: slidesToScroll,  // 一次显示多少个
      slidesToScroll: slidesToScroll,  // 每次滚动多少个
      autoplay: autoplay, // 是否自动播放
      arrows: false,  // 是否需要左右箭头
  });
  
}

thirdPluginLoader({
  initFun: initFunc,
  libSrc: jsFileUrl,  
});
var styleStr = ".slick-slider\
{\
    position: relative;\
    display: block;\
    -moz-box-sizing: border-box;\
         box-sizing: border-box;\
    -webkit-user-select: none;\
       -moz-user-select: none;\
        -ms-user-select: none;\
            user-select: none;\
    -webkit-touch-callout: none;\
    -khtml-user-select: none;\
    -ms-touch-action: pan-y;\
        touch-action: pan-y;\
    -webkit-tap-highlight-color: transparent;\
}\
.slick-list\
{\
    position: relative;\
    display: block;\
    overflow: hidden;\
    margin: 0;\
    padding: 0;\
}\
.slick-list:focus\
{\
    outline: none;\
}\
.slick-list.dragging\
{\
    cursor: pointer;\
    cursor: hand;\
}\
.slick-slider .slick-track,\
.slick-slider .slick-list\
{\
    -webkit-transform: translate3d(0, 0, 0);\
       -moz-transform: translate3d(0, 0, 0);\
        -ms-transform: translate3d(0, 0, 0);\
         -o-transform: translate3d(0, 0, 0);\
            transform: translate3d(0, 0, 0);\
}\
.slick-track\
{\
    position: relative;\
    top: 0;\
    left: 0;\
    display: block;\
}\
.slick-track:before,\
.slick-track:after\
{\
    display: table;\
    content: '';\
}\
.slick-track:after\
{\
    clear: both;\
}\
.slick-loading .slick-track\
{\
    visibility: hidden;\
}\
.slick-slide\
{\
    display: none;\
    float: left;\
    height: 100%;\
    min-height: 1px;\
}\
[dir='rtl'] .slick-slide\
{\
    float: right;\
}\
.slick-slide img\
{\
    display: block;\
}\
.slick-slide.slick-loading img\
{\
    display: none;\
}\
.slick-slide.dragging img\
{\
    pointer-events: none;\
}\
.slick-initialized .slick-slide\
{\
    display: block;\
}\
.slick-loading .slick-slide\
{\
    visibility: hidden;\
}\
.slick-vertical .slick-slide\
{\
    display: block;\
    height: auto;\
    border: 1px solid transparent;\
}\
.slick-loading .slick-list\
{\
    background: #fff center center no-repeat;\
}\
.slick-prev,\
.slick-next\
{\
    font-size: 0;\
    line-height: 0;\
    position: absolute;\
    top: 50%;\
    display: block;\
    width: 20px;\
    height: 20px;\
    margin-top: -10px;\
    padding: 0;\
    cursor: pointer;\
    color: transparent;\
    border: none;\
    outline: none;\
    background: transparent;\
}\
.slick-prev:hover,\
.slick-prev:focus,\
.slick-next:hover,\
.slick-next:focus\
{\
    color: transparent;\
    outline: none;\
    background: transparent;\
}\
.slick-prev:hover:before,\
.slick-prev:focus:before,\
.slick-next:hover:before,\
.slick-next:focus:before\
{\
    opacity: 1;\
}\
.slick-prev.slick-disabled:before,\
.slick-next.slick-disabled:before\
{\
    opacity: .25;\
}\
.slick-prev:before,\
.slick-next:before\
{\
    font-size: 20px;\
    line-height: 1;\
    opacity: .75;\
    color: white;\
    -webkit-font-smoothing: antialiased;\
    -moz-osx-font-smoothing: grayscale;\
}\
.slick-prev\
{\
    left: -25px;\
}\
[dir='rtl'] .slick-prev\
{\
    right: -25px;\
    left: auto;\
}\
.slick-prev:before\
{\
    content: '←';\
}\
[dir='rtl'] .slick-prev:before\
{\
    content: '→';\
}\
.slick-next\
{\
    right: -25px;\
}\
[dir='rtl'] .slick-next\
{\
    right: auto;\
    left: -25px;\
}\
.slick-next:before\
{\
    content: '→';\
}\
[dir='rtl'] .slick-next:before\
{\
    content: '←';\
}\
.slick-slider\
{\
    margin-bottom: 30px;\
}\
.slick-dots\
{\
    position: absolute;\
    bottom: -45px;\
    display: block;\
    width: 100%;\
    padding: 0;\
    list-style: none;\
    text-align: center;\
}\
.slick-dots li\
{\
    position: relative;\
    display: inline-block;\
    vertical-align: bottom;\
    width: 20px;\
    height: 20px;\
    margin: 0 5px;\
    padding: 0;\
    cursor: pointer;\
}\
.slick-dots li button\
{\
    font-size: 0;\
    line-height: 0;\
    display: block;\
    width: 20px;\
    height: 20px;\
    padding: 5px;\
    cursor: pointer;\
    color: transparent;\
    border: 0;\
    outline: none;\
    background: transparent;\
}\
.slick-dots li button:hover,\
.slick-dots li button:focus\
{\
    outline: none;\
}\
.slick-dots li button:hover:before,\
.slick-dots li button:focus:before\
{\
    opacity: 1;\
}\
.slick-dots li button:before\
{\
    font-size: 24px;\
    line-height: 24px;\
    position: absolute;\
    top: -4px;\
    left: 0;\
    width: 20px;\
    height: 20px;\
    content: '•';\
    text-align: center;\
    opacity: .25;\
    color: black;\
    -webkit-font-smoothing: antialiased;\
    -moz-osx-font-smoothing: grayscale;\
}\
.slick-dots li.slick-active button:before\
{\
    opacity: .75;\
    color: black;\
}";
if (!chart.$elem.find("style#chart-style").length) {
  chart.$elem.append("<style id='chart-style'>" + styleStr + "</style>");
}