var config = {
    resource: ['https://gw.alipayobjects.com/os/antv/assets/g2/3.0.4-beta.2/g2.min.js'],
    colorSetting: null,
    init: function() {
    	var CoordChart = getChartDirective();
    	var myChart = new CoordChart(chart, config);
    	myChart.draw();
    }
}
bdp.loadjs({
    src: ['https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js'],
    callback: config.init,
});

function getChartDirective() {
    // 获得自定义图表的相关信息，快速获取
    class CustomChart {
        constructor(chartInstant = chart) {
            this.originInfo = chartInstant;
            this.container = document.getElementById('custom-chart');
            this.wrapHeight = window.innerHeight,
                this.isMobile = !this._isPC();
        }

        async loadResource() {
            if (this.resource.length === 0) {
                return true;
            } else {
            	await new Promise((resolve, reject) => {
            	    bdp.loadjs({
            	        callback: () => resolve(),
            	        src: this.resource, //或者是一个数组: ['a.js', 'b.js', __uri('/static/js/lib/mapv/mapv.min.js')]
            	    });
            	});
            }
        }

        _isPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            return flag;
        }
    }

    class CoordChart extends CustomChart {
        constructor(chartInstant = chart, {
            resource = [],
            colorSetting = null
        }) {
            super(chartInstant);
            let chartData = chartInstant.views;

            this.resource = resource;
            this.xData = chartData[0].data.x[0].data;
            this.yData = chartData[0].data.y[0].data;
            this.xName = chartData[0].data.x[0].nick_name || chartData[0].data.x[0].name;;
            this.yName = "population";
            this.data = this._getData();
            this.ready = this.loadResource().then(() => {
                this.chart = new G2.Chart({
                    container: this.container,
                    forceFit: true,
                    height: this.wrapHeight,
                    padding: [20, 80, 60, 80]
                });
                this.colorSetting = colorSetting || G2.Global.colors_pie_16;
            })
        }

        draw() {
            this.ready.then(() => {
                // h5仪表盘不显示图例，有时候图例太多
                if (this.isMobile && this.originInfo.mode === '12*12') {
                    this.chart.legend(false);
                } else {
                    this.chart.legend({
                        position: 'bottom',
                        offsetY: -50,
                        offsetX: 20,
                        itemWidth: 100,
                        useHtml: true
                    });
                }
                this.chart.source(this.data);
                this.chart.coord('polar', {
                    innerRadius: 0.2
                });
                this.chart.axis(false);
                this.chart.interval()
                    .position(this.xName + '*' + this.yName)
                    .color(this.xName, this.colorSetting)
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.chart.render();

                // 图例太多？？？
                let g2Legend = $('.g2-legend');
                g2Legend && g2Legend.css({
                    'height': 50
                });
            })
        }

        _getData() {
            let data = []
            this.xData.forEach((item, index) => {
                data.push({
                    [this.xName]: item,
                    [this.yName]: +this.yData[index]
                });
            });
            return data;
        }
    }

    return CoordChart;
}