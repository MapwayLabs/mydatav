/**
 * 文本类型图表
 */
(function() {

    var helper = bdpChart.helper;

    /**
     * 获取自定义图表iframe绘制所需数据，从最新的chart中获取
     * @param chart
     * @returns {{info, views: (*|views|null), chartInfo}}
     */
    bdpChart.getCustomChartData = function (chart) {
        var chartData = {
            info: chart.info,
            views: chart.views,
            chartInfo: chart.info // 为了自定义表格而传入的chartInfo  得不偿失啊......
        };
        chartData.lang = bdpChart.language || 'zh';
        chartData.theme = chart.theme;
        chartData.mode = chart.mode;
        chartData.ct_id = chart.ct_id;
        chartData.mobile = chart.mobile;
        chartData.displayDevice = chart.displayDevice;
        chartData.isMobileMode = chart.isMobileMode;
        return chartData;
    };

    bdpChart.setCustomSpec = function(chart) {
        var $elem = chart.$elem,
            info = chart.info,
            x_fields = chart.views.map(function(view) {
                return view.info.x; }),
            y_fields = chart.views.map(function(view) {
                return view.info.y; }),
            c_fields = chart.views.map(function(view) {
                return view.info.compare_axis; }),
            custom_setting = chart.info.meta.custom_chart_setting,
            customMode = custom_setting.mode || 'vega',
            customCode = custom_setting.code;

        if (customCode) {
            var dataViews = [],
                dataViewNames = [],
                allXFields = [],
                allYFields = [],
                allCFields = [];
            chart.views.forEach(function(view, idx) {
                var formattedData = [],
                    info = view.info,
                    data = view.data,
                    allData = view.data.x.concat(data.y),
                x_fields = info.x.map(function(field, idx) { field.id = "x" + idx;
                        return field.id; }),
                    y_fields = info.y.map(function(field, idx) { field.id = "y" + idx;
                        return field.id; }),
                    c_fields = info.compare_axis.map(function(field, idx) { field.id = "c" + idx;
                        return field.id; }),
                    xy_fields = x_fields.concat(y_fields),
                dataViewName = "ds" + idx;

                if (xy_fields.length > 0) {
                    for (var i = 0, len = allData[0].data.length; i < len; i++) {
                        var item = {};
                        x_fields.forEach(function(field, idx) {
                            item[field] = helper._formatXAxisLabel.apply(view, [data.x[idx].data[i], idx]);
                        });
                        y_fields.forEach(function(field, idx) {
                            item[field] = +data.y[idx].data[i];
                        });
                        formattedData.push(item);
                    }
                }

                dataViews.push({ name: dataViewName, values: formattedData });
                allXFields.push(info.x);
                allYFields.push(info.y);
                allCFields.push(info.compare_axis);
            });

            dataViewNames = dataViews.map(function(view) {
                return view.name });

            var debug = bdp.utils.getQueryString('debug'),
                disablejs = bdp.utils.getQueryString('disablejs');

            if (customMode == 'vega') {

                var renderVegaSpec = function() {
                    customCode = "var spec = " + customCode + ";" + "return spec;";

                    try {
                        var getVegaSpec = new Function("$DATA_VIEWS", "$X_FIELDS", "$Y_FIELDS", "$C_FIELDS", customCode),
                            vegaSpec = getVegaSpec(dataViewNames, allXFields, allYFields, allCFields);

                        vegaSpec = $.extend(true, {
                            autosize: 'fit',
                            padding: 10,
                            data: [],
                        }, vegaSpec);

                        vegaSpec.data = dataViews.concat(vegaSpec.data);

                        if (vegaSpec.autosize == 'fit') {
                            if (vegaSpec.width === undefined) {
                                vegaSpec.width = $elem.width() - vegaSpec.padding * 2 - 12;
                            }
                            if (vegaSpec.height === undefined) {
                                vegaSpec.height = $elem.height() - vegaSpec.padding * 2 - 12;
                            }
                        }
                        render($elem, vegaSpec, chart.mode == 'edit');
                        if(chart.mobile){
                            window.requestAnimationFrame (vageEndRender);
                        }

                    } catch (e) {
                        console.error(e);
                        handleError(chart, e);
                    }
                };
            
                if(chart.mobile){
                    window.mobVage({
                        initFun: renderVegaSpec,
                        libSrc: __uri('/static/js/lib/vega/vega.js'),
                        libId: window.vega
                    }, {
                        funcQueue: [],
                        loadLibInProgress: false
                    });
                }else{
                    thirdPluginLoader({
                        initFun: renderVegaSpec,
                        libSrc: __uri('/static/js/lib/vega/vega.js'),
                        libId: window.vega
                    }, {
                        funcQueue: [],
                        loadLibInProgress: false
                    });
                }
                

            } else {
                if (info.code_check_result && +info.code_check_result.status !== 0) {
                    return handleError(chart, "代码运行检测异常 " + "status: " + info.code_check_result.status + ", msg: " + info.code_check_result.msg);
                }
                try {

                    // render chart in iframe
                    var chartData = bdpChart.getCustomChartData(chart);
                    if(debug == 'true') {
                        console.debug('Chart ' + chartData.ct_id + ' : ', chartData);
                    } 
                    
                    if (disablejs != 'true') {
                        var iframe;
                        if (chart.$elem.find("iframe").length > 0) {
                            iframe =  chart.$elem.find("iframe").get(0);
                            iframe.contentWindow.postMessage(JSON.stringify(bdpChart.getCustomChartData(chart)), window.location.origin || "/");

                        } else {
                            iframe = document.createElement("iframe");
                            iframe.src = "/custom_chart.html"
                            iframe.id = '_iframe_' + chart.ct_id;
                            iframe.className = 'J-export-iframe-img';
                            iframe.scrolling = 'no';
                            chart.$elem.html(iframe);
                            iframe.onload = function() {
                                iframe.contentWindow.postMessage(JSON.stringify(bdpChart.getCustomChartData(chart)), window.location.origin || "/");
                            }
                        }
                    }

                } catch (err) {
                    handleError(chart, err);
                }
            }
        
        } else {  // 没有代码，展示占位图片及文案
            var tip;
            if (chart.mode == 'edit') {
                tip = bdpChart.language == 'zh' ? '运行代码即可预览图表' : 'Run to preview the results';
            } else {
                tip = bdpChart.language == 'zh' ? '无可用图表，请检查图表视图配置' : 'No chart, please check settings';
            }
            chart.$elem.html('<div class="empty-custom-chart-tip">' + tip + '</div>');
        }
    }
     /**
         * 移动端如果位vage的话，发送render通知      
     */
    function vageEndRender(){
        var callNative = window.__BDP_CALL_NATIVE__;
        callNative('rendered',{},'');
    }

    function handleError(chart, err) {
        console.error(err);
        var tip;
        if (chart.mode == 'edit') {

            tip = bdpChart.language == 'zh' ? '代码运行异常，请检查代码' : 'code error，please check your code';

            if (err &&err.stack && typeof err.stack == 'string') {
                var errInfo = err.stack.split("\n"),
                    targetErrorInfo = errInfo.length > 1 && /<anonymous>:(\d+)/.exec(errInfo[1]);
                if (targetErrorInfo && targetErrorInfo.length > 1) {
                    var lineNumber = targetErrorInfo[1];
                    lineNumber = +lineNumber - 2;
                    var doc = document.createElement('pre');
                    doc.innerHTML = '<span>' + errInfo[0] + "</span><span class='line-number'>line: " + lineNumber + "</span>";
                    $(doc).addClass("error");
                    $(doc).find('.line-number').attr('data-linenum', lineNumber);
                    $("#console-message").append(doc);
                }
            }

        } else {
            tip = bdpChart.language == 'zh' ? '图表配置异常，请检查图表视图配置' : 'Chart error，please check settings';
        }

        chart.$elem.html('<div class="empty-custom-chart-tip">' + tip + '</div>');
    }

    function getFormattedChart(chart) {
        var ouput = anguluar.copy(chart);

    }

    function render($elem, spec, debug) {
        // use vega 3.0
        var view = new vega.View(vega.parse(spec))
            .logLevel(vega.Warn)
            .initialize($elem.get(0)) // set parent DOM element
            .hover() // enable hover event processing
            .run(); // update and render the view

        // 加chart-canvas这个类名是因为导出仪表盘的逻辑依赖chart-canvas做判断，去将所有的canvas转化成图片，传给后端
        $elem.find("canvas").addClass("chart-canvas");

        if(debug) { // 编辑页面开启debug模式，在window挂一个全局变量，方便调试
            window.BDPVegaView = view;
        }
    }

})();