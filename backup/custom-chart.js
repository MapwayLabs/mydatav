(function() {
    var helper = bdpChart.helper;
    
	function render($elem, spec) {
        // use vega 3.0
        var view = new vega.View(vega.parse(spec))
            // .logLevel(vega.warn)
            .initialize($elem.get(0)) // set parent DOM element
            .hover() // enable hover event processing
            .run(); // update and render the view
    }

	window.addEventListener('message', function(e) {
        if(e.source != window.parent) return;
        var data = e.data;
        if (typeof data == 'string') {
            data = JSON.parse(data);
            if (data.resources && data.resources.length > 0) {
                data.info.resources = data.resources;
            }
            data.$elem = $(".chart-box");
        }
        var custom_setting = data.info.meta.custom_chart_setting;
        var customMode = custom_setting.mode;
        // 如果是商城且为vega则走此逻辑
        if (!!data.store && customMode === 'vega') {
            // chart prototype 上的_formatXAxisLabel方法丢失，导致Vega渲染失败
            data['_formatXAxisLabel'] = formatXAxisLabel;
            bdpChart.setCustomSpec(data);
        }else {
            renderChart(data, true);
            if(data.mobile){
                window.requestAnimationFrame (endRender);
            }
        }
    },false);
    /**
     * 向移动端发送render完的标识
     */
    function endRender (){
        var callNative = window.__BDP_CALL_NATIVE__;
        callNative('rendered',{},'');
    }

    window.renderChart = function(chart) {
        if (typeof chart == 'string') {
            chart = JSON.parse(chart);
        }
        chart.$elem = $(".chart-box");

        chart.$elem.html('');
        setTimeout(function() {
            if (!!chart.chartError) {
                handleError(chart, chart.chartError);
                return;
            }
        }, 0);

        if(chart.theme == 'dark') {
            chart.$elem.addClass("chart-theme-dark").removeClass("chart-theme-light");
        } else {
            chart.$elem.addClass("chart-theme-light").removeClass("chart-theme-dark");
        }
        // 2017-09-21 19:59:06 将resources URL 单独提出作为数组
        var resourceUrl = [];
        var location = window.location;
        var origin = location.protocol + '//' + location.host;
        if (chart.info.resources.length > 0) {
            chart.info.resources.forEach(function(item, index){
                resourceUrl.push(origin + '/api/chart_resource/get?re_id=' + item.re_id);
            });
        }
        chart.info['resourceUrl'] = resourceUrl;
        var customCode = chart.info.meta.custom_chart_setting.code;

        try {
            var dataViews = [],
                dataViewNames = [],
                allXFields = [],
                allYFields = [],
                allCFields = [];

            // chart.views.forEach(function(view, idx) {
            //     var formattedData = [],
            //         info = view.info,
            //         data = view.data,
            //         allData = view.data.x.concat(data.y)
            //     x_fields = info.x.map(function(field, idx) { field.id = "x" + idx;
            //             return field.id; }),
            //         y_fields = info.y.map(function(field, idx) { field.id = "y" + idx;
            //             return field.id; }),
            //         c_fields = info.compare_axis.map(function(field, idx) { field.id = "c" + idx;
            //             return field.id; }),
            //         xy_fields = x_fields.concat(y_fields)
            //     dataViewName = "$BDP_DATAVIEW_" + idx;

            //     if (xy_fields.length > 0) {
            //         for (var i = 0, len = allData[0].data.length; i < len; i++) {
            //             var item = {};
            //             x_fields.forEach(function(field, idx) {
            //                 item[field] = chart._formatXAxisLabel.apply(view, [data.x[idx].data[i], idx]);
            //             });
            //             y_fields.forEach(function(field, idx) {
            //                 item[field] = +data.y[idx].data[i];
            //             });
            //             formattedData.push(item);
            //         }
            //     }

            //     dataViews.push({ name: dataViewName, values: formattedData });
            //     allXFields.push(info.x);
            //     allYFields.push(info.y);
            //     allCFields.push(info.compare_axis);
            // })

            // dataViewNames = dataViews.map(
            //  function(view) {
            //      return view.name 
            //     }
            // );


            // 对X轴的数据进行格式化
            var views =  chart.views.map(function(view, viewIndex) {
                view.data.x.forEach(function(x, xFieldIndex) {
                    // 如果是时间则复制以字段备用
                    if (x['data_type'] === 'date') {
                        x['source_data'] = x.data;
                    }
                    x.data = x.data.map(function(val) {
                        return /年|月|日/.test(val) ? val : formatXAxisLabel.apply(view, [val, xFieldIndex]);
                    });
                });

                var subtotal = view.data.subtotal;
                if(subtotal){
                    var subtotalSetting = view.info.tb_statistic.subtotal_setting.dimensions;
                    for(var row in subtotal){
                        if(subtotal.hasOwnProperty(row)){
                            // 待插入小计
                            subtotal[row].forEach(function(rowData){
                                for(var i = 0; i < rowData.length; i++){
                                    if(rowData[i] === '[__subtotal__]'){
                                        break;
                                    }else if(subtotalSetting[i]){
                                        rowData[i] = formatXAxisLabel.apply(view, [rowData[i], i]);
                                    }
                                }
                            });
                        }
                    }
                }
                return view;
            });

            chart.views = views;

            var bdpTable = new BDPTable(chart.views, chart.$elem, chart.ct_id, chart.chartInfo);
            var customFunc = new Function('chart', 'bdpVega', 'bdpTable', 'alasql', '$DATA_VIEWS', '$X_FIELDS', '$Y_FIELDS', '$C_FIELDS', customCode);
            customFunc(chart, { render: render }, bdpTable, alasql,
                dataViewNames, allXFields, allYFields, allCFields);
        } catch (err) {
            handleError(chart, err);
        }
    }

	function handleError(chart, err) {
        console.error(err);
        var tip;
        if (chart.mode == 'edit') {

            tip = chart.lang == 'zh' ? '代码运行异常，请检查代码' : 'code error，please check your code';

            // if (err.stack && typeof err.stack == 'string') {
            //     var errInfo = err.stack.split("\n"),
            //         targetErrorInfo = errInfo.length > 1 && /<anonymous>:(\d+)/.exec(errInfo[1]);
            //     if (targetErrorInfo && targetErrorInfo.length > 1) {
            //         var lineNumber = targetErrorInfo[1];
            //         lineNumber = +lineNumber - 2;
            //         var doc = document.createElement('pre');
            //         doc.innerHTML = '<span>' + errInfo[0] + "</span><span class='line-number'>line: " + lineNumber + "</span>";
            //         $(doc).addClass("error");
            //         $(doc).find('.line-number').attr('data-linenum', lineNumber);
            //         $("#console-message").append(doc);
            //     }
            // }

        } else {
            tip = chart.lang == 'zh' ? '图表配置异常，请检查图表视图配置' : 'Chart error，please check settings';
        }

        if (!!chart.chartError) {
            tip = chart.chartError;
        }
        chart.$elem.html('<div class="empty-custom-chart-tip">' + tip + '</div>');
        return;
    }


    function formatXAxisLabel(val, axisIndex, needFullFormat) {
        var datum = this.data;
        var info = this.info; 
        var field = info.xAxis[axisIndex];

        if ( field && field.data_type === 'date') {
            var xData = datum.x[axisIndex].data;
            var granularityOpt = helper.getGranularity(datum, xData.length, axisIndex);
            var tickInterval = granularityOpt.tickInterval;
            var granularity = granularityOpt.granularity || 'day';
            var granularityName = granularityOpt.granularity_name || '';
            var gConfig = info.xAxis[axisIndex].month_start_day || 0; // 只有自定义月用到，月的起始天
            var diffValue = xData[xData.length - 1] - xData[0];

            if (needFullFormat) {
                if ( granularity === 'hour' || granularity === 'minute' || granularity === 'second'){
                    granularity = 'g_' + granularity;
                }

            } else {
                granularity = helper.setGranularityByDate(granularity, diffValue);
            }
            
            if (granularity === 'week') {
                gConfig = 1;
                if (granularityName) {
                    gConfig = field.week_start_day_of_week;
                }

                var day = (new Date(val)).getDay();
                if (day > gConfig) {
                    val -= (day - gConfig) * 86400000;
                } else {
                    val += (gConfig - day) * 86400000;
                }
            }

            return helper.checkGranularity(granularity, val, granularityName, gConfig);

        } else if ( field && field.data_type === 'sub_date') {
            var granularity = field.fid.split('_')[1];
            return bdpChart.helper.subDateFormat(granularity, val);
        } else {
            return val;
        }

    }

    //TODO: 模块化加载 代替copy
    window.thirdPluginLoader = function(conf, globalConf) {
        if (!conf.initFun) {
            throw 'you forget the initFun';
        }

        globalConf = globalConf || {
            funcQueue: [],
            loadLibInProgress: false
        };

        var extend = function(a, b) {
            var n;
            if (!a) {
                a = {};
            }
            for (n in b) {
                a[n] = b[n];
            }
            return a;
        }

        var opts = extend({
            initFun: function() {},
            libSrc: '',
            otherSrc: '',//可选
            libId: null
        }, conf);

        var handleCb = function() {
            globalConf.loadLibInProgress = false;
            opts.initFun();
            for (var i = 0, len = globalConf.funcQueue.length; i < len; i++) {
                try {
                    globalConf.funcQueue[i]();
                } catch(e) {
                    continue;
                }
            }
            globalConf.funcQueue = [];
        };

        if (opts.libId) {//库已下载完成
            opts.initFun();
        } else {
            if (!globalConf.loadLibInProgress) {//没有下载库
                globalConf.loadLibInProgress = true;
                getScript(opts.libSrc, function() {
                    if (opts.otherSrc) {
                        getScript(opts.otherSrc, function() {
                            handleCb();
                        })
                    } else {
                        handleCb();
                    }
                });
            } else {
                globalConf.funcQueue.push(opts.initFun);
            }
        }
        
    }

    var isIE = /msie/.test(navigator.userAgent.toLowerCase());
    function getScript(url, successCb, failCb, noCache) {
        var opts = {
            'charset': 'UTF-8',
            'timeout': 30 * 1000
        };
        var head = document.getElementsByTagName('head')[0];
        
        // function removeNode( node ) {
        //     node && node.parentNode && node.parentNode.removeChild( node );
        // }
        var js, requestTimeout;
        
        // if (js != null && !isIE) {
        //     removeNode(js);
        //     js = null;
        // }
        if (js == null) {
            js = document.createElement('script');
        }
        
        js.charset = opts.charset;
        // js.id = 'scriptRequest_script_' + uniqueID;
        js.type = 'text/javascript';
        if (successCb != null) {
            if (isIE) {
                js['onreadystatechange'] = function(){
                    if (js.readyState.toLowerCase() == 'loaded' || js.readyState.toLowerCase() == 'complete') {
                        try{
                            clearTimeout(requestTimeout);
                            head.removeChild(js);
                            js['onreadystatechange'] = null;
                        }catch(exp){ }
                        successCb();
                    }
                };
            }
            else {
                js['onload'] = function(){
                    try{
                        clearTimeout(requestTimeout);
                        // removeNode(js);
                    }catch(exp){ }
                    successCb();
                };
                
            }
            
        }
        
        if (noCache) {
            url = url + '&_t=' + (new Date).getTime();
        }
        js.src = url;
        
        head.appendChild(js);
        
        if (opts.timeout > 0) {
            requestTimeout = setTimeout(function(){
                try{
                    head.removeChild(js);
                }catch(exp){
                    
                }
                failCb && failCb();
            }, opts.timeout);
        }
        return js;
    }
    window.getScript = getScript;

})();
