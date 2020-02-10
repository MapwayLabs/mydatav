var urlTemplate = chart.info.meta.custom_chart_setting.charSetting.url;
// 如果数据视图中有数据，则取第一个维度的第一个值作为iframe的url.
if (chart.views && chart.views.length) {
  var xData = chart.views[0].x && chart.views[0].x.data;
  if (xData) {
    urlTemplate = xData[0];
  }
}

var iframe = document.createElement('iframe');
iframe.src = urlTemplate;
iframe.width = chart.$elem.width();
iframe.height = chart.$elem.height();

chart.$elem.html(iframe);
