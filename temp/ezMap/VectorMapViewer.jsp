<HTML xmlns:v ="urn:schemas-microsoft-com:vml">
  <head>
	<meta http-equiv="content-type" content="text/html; charset=GB2312"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	
	<title>地图测试页面</title>
	<LINK href="css/EzServer.css" type="text/css" rel="stylesheet">
	<SCRIPT type="text/javascript" src="/EzServer/Maps/qdsl2018/js/EzMapAPI.jsp"></SCRIPT>
	<script type="text/javascript">
		_MapApp=null;
		var tileLyr0 = null;
		var mapFullExtent = EzServerClient.GlobeParams.MapFullExtent;
		var mapCenter = [(mapFullExtent[0]+mapFullExtent[2])/2,(mapFullExtent[1]+mapFullExtent[3])/2];
		var mapInitLevel = EzServerClient.GlobeParams.MapInitLevel;
		var mapMaxLevel = EzServerClient.GlobeParams.MapMaxLevel;
		var zoomOffset = EzServerClient.GlobeParams.ZoomOffset;
		var originAnchor = EzServerClient.GlobeParams.TileAnchorPoint;
		var zoomLevelSequence = EzServerClient.GlobeParams.ZoomLevelSequence;
		var mapCoordinateType = EzServerClient.GlobeParams.MapCoordinateType;
		var mapUrl = EzServerClient.GlobeParams.MapSrcURL;
		var CRSType = EzServerClient.GlobeParams.CRSType;
		var initResolution = 1.40625;
		
		function onLoad() {
			if(typeof EzMap =="undefined"){
				window.setTimeout("onLoad()",10);
				return;
			}
			if(_compatIE()){
				_MapApp = new EzMap(document.getElementById("map"),{
					//设置地图中心
					mapCenter:mapCenter,
					//设置地图全图范围
					mapFullExtent:mapFullExtent,
					//设置地图初始化级别
					mapInitLevel:mapInitLevel,
					//设置地图最大级别
					mapMaxLevel:mapMaxLevel,
					//设置地图级别偏移量
					zoomOffset:zoomOffset,
					//设置版权信息
					copyRight:"&copy; easymap"
				});
				if(EzServerClient.GlobeParams.CRSType == "TDT"){
					if(originAnchor[0]==0&&originAnchor[1]==128)
						initResolution = 2;
					if(originAnchor[0]==-512&&originAnchor[1]==512){
						tileLyr0 = new EzServerClient.Layer.EzMapTileLayer2010("lyr0", mapUrl[0][1][0],{
							//瓦片的宽度，单位为像素px
							tileWidth:256,
							//瓦片的高度，单位为像素px
							tileHeight:256,
							//设置瓦片地图起始锚点，即0行0列地图的左下角地图坐标，瓦片行列号方向为以此锚点向上向右递增
							originAnchor:originAnchor,
							//设置地图比例尺级别是降序还是升序的，以及采用的是什么版本的切图地图,EzMapTileLayer2005中取值为0或者1
							//  0：左侧工具条的等级，从上往下升序
							//  1：左侧工具条的等级，从上往下降序
							zoomLevelSequence:2,
							mapCoordinateType: 1
						});

					}else{
						tileLyr0 = new EzServerClient.Layer.TianDiTuTileLayer("lyr0",mapUrl[0][1][0],{
							initResolution:initResolution,
							source:"EzServer",
							originAnchor:originAnchor
						})
					}

				}
				if(EzServerClient.GlobeParams.CRSType == "PGIS"){
					if(zoomLevelSequence == 0||zoomLevelSequence == 1 ){
						tileLyr0 = new EzServerClient.Layer.EzMapTileLayer2005("lyr0", mapUrl[0][1][0],{
							//瓦片的宽度，单位为像素px
							tileWidth:256,
							//瓦片的高度，单位为像素px
							tileHeight:256,
							//设置瓦片地图起始锚点，即0行0列地图的左下角地图坐标，瓦片行列号方向为以此锚点向上向右递增
							originAnchor:originAnchor,
							//设置地图比例尺级别是降序还是升序的，以及采用的是什么版本的切图地图,EzMapTileLayer2005中取值为0或者1
							//  0：左侧工具条的等级，从上往下升序
							//  1：左侧工具条的等级，从上往下降序
							zoomLevelSequence:zoomLevelSequence,
							//设置地方坐标系缩放比例（根据切图时所给定的值设定此值）
							//mapConvertOffsetX: 0,
							//设置地方坐标系Y轴偏移量（此时，根据切图时所给定的值设定此值）
							//mapConvertOffsetY: 0,
							//设置地图坐标系类型：经纬度坐标系为1；地方坐标时为mapConvertScale所设定的值
							mapCoordinateType: mapCoordinateType
						});
					}
					if(zoomLevelSequence == 2||zoomLevelSequence == 3 ){
						tileLyr0 = new EzServerClient.Layer.EzMapTileLayer2010("lyr0", mapUrl[0][1][0],{
							//瓦片的宽度，单位为像素px
							tileWidth:256,
							//瓦片的高度，单位为像素px
							tileHeight:256,
							//设置瓦片地图起始锚点，即0行0列地图的左下角地图坐标，瓦片行列号方向为以此锚点向上向右递增
							originAnchor:originAnchor,
							//设置地图比例尺级别是降序还是升序的，以及采用的是什么版本的切图地图,EzMapTileLayer2005中取值为0或者1
							//  0：左侧工具条的等级，从上往下升序
							//  1：左侧工具条的等级，从上往下降序
							zoomLevelSequence:zoomLevelSequence,
							mapCoordinateType: mapCoordinateType
						});
					}
				}
				var uGroupLyr0 = new EzServerClient.GroupLayer(mapUrl[0][0], [tileLyr0]);

				_MapApp.addGroupLayers([uGroupLyr0]);
				_MapApp.initialize();
				_MapApp.hideMapServer();
				_MapApp.showStandMapControl();
				_MapApp.hideMapScale();

				//显示坐标
				document.getElementById("map").onmousemove = function(){
					document.getElementById("coordsShowDiv").innerText = "坐标：" +  _MapApp.map.mouseLng + ";" + _MapApp.map.mouseLat;
				}

			}else if(_MapApp==null){
				var pEle=document.getElementById("map");
			}
		}
		
		function getLevel(pEle){
			pEle.value=_MapApp.getZoomLevel();
		}
		
		function getBounds(){
			_MapApp.changeDragMode('drawRect',datainput);
		}
		
		function download(){
			var pPointArry=datainput.value.split(",");
			var iZoom=parseInt(setLevel.value);
			if(pPointArry.length<4){
				alert("请设置边框坐标");
				return;
			}
			if(isNaN(iZoom) || iZoom>22  || iZoom<-3){
				alert("请设置级别,或级别错误");
				return;
			}
			// 变成投影后的
			for(var i=0;i<pPointArry.length;i++){
				pPointArry[i] = parseFloat(pPointArry[i]);
			}
			_MapApp.downloadMap(pPointArry[0],pPointArry[1],pPointArry[2],pPointArry[3],iZoom,"imageFile");
		}

		function TMS_getImage(){
             var s=document.getElementById("TMS_getImage").value;
             window.open(s);
			}
		function TMS_getMetadata(){
	         var s=document.getElementById("TMS_getMetadata").value;
	         window.open(s);
			}

		function switchMapCoords(){
			var mouseCoords = document.getElementById("coordsSpan");
			if (mouseCoords.style.display=="") {
				mouseCoords.style.display="none";
			} else {
				mouseCoords.style.display="";
			}
		}
		function gotoCoords(){
			var center = document.getElementById("gotoCoords").value;
			try{
				if(center == "")
					return;
				else{
					var x = parseFloat(center.split(",")[0]);
					var y = parseFloat(center.split(",")[1]);
					_MapApp.centerAtLatLng(x,y);
				}

			}catch(e){
				
			}

		}	
	</script>
  </head>
  


  <body onload="onLoad()">
  <table style="width:100%;height:95%">
  	<tr height="*">
	  <td colspan=2 >
	  	<fieldset style="width:100%;height:92%">
			<legend>地图窗口</legend>
				<table border="0" cellpadding="0" cellspacing="0" style="width:100%;height:100%" >
				<tr height="*">
					<td>
						<div id="map" style="height:380px;width:100%;" > </div>
					</td>
				</tr>
				</table>
			</fieldset>
		</td>
	</tr>
  
  	<tr height="60px">
	  <td colspan=2>
	  	<fieldset style="width:100%;height:100%">
			<legend>下载设置</legend>
				<table>
					<tbody>
						<tr>
							<td style="80%" align="right"><input value="获取范围" type="button" onclick="getBounds()" ></td>
							<td><input name="datainput" value="" type="text" size=80  ></td>
							<td width="200" style="position:absolute;right:490"><input id="gotoCoords" value="" type="text" size=20><input value="goto" type="button" onclick="gotoCoords()"></td>
							<!--<td style="position:absolute;right:5"><span id="coordsShowDiv" onclick="switchMapCoords()" style="width:200px;"></span></td>-->
							
						</tr>
						<tr>
							<td style="80%" align="right"><input value="获取级别" type="button" onclick="getLevel(setLevel)"></td>
							<td><input name=setLevel value="" type="text" size=80 ></td>
							<td align="left"><input value="  下载  " type="button" onclick="download()"></td>
							<td ><span id="coordsShowDiv" onclick="switchMapCoords()" style="width:200px;"></span></td>
						</tr>
						
					</tbody>
				</table>
				
			</fieldset>
		</td>
	</tr>
	<tr height="60px">
	  <td colspan=2>
	  	<fieldset style="width:100%;height:100%">
			<legend>瓦片网络地图服务</legend>
				<table>
					<tbody>
						<tr>
							<td style="80%" align="right"><p>获取切片：</p></td>
							<td><input id="TMS_getImage" name="getImage" value="http://10.49.129.220:9080/EzServer/Maps/qdsl2018?SERVICE=TMS&VERSION=1.2.0&REQUEST=GetImage&LAYERS=qdsl2018&STYLES=default&TRANSPARENT=0.7&MIME=image/gif&LEVEL=8&ROW=79&COL=232&TIME=20100328" 
							type="text" size=80  ></td>
							<td align="center"><input value=" getImage()  " type="button" onclick="TMS_getImage();"></td>
						</tr>
						<tr>
							<td style="80%" align="right"><p>图层信息：</p></td>
							<td><input id="TMS_getMetadata" name="getMetadata" value="http://10.49.129.220:9080/EzServer/Maps/qdsl2018?SERVICE=TMS&VERSION=1.2.0&REQUEST=GetMetadata" type="text" size=80 ></td>
							<td align="center"><input value="getMetadata()" type="button" onclick="TMS_getMetadata();"></td>
						</tr>
						
					</tbody>
				</table>
			</fieldset>
		</td>
	</tr>
</table>
</body>
</html>