(function extendWindow(defines) {
  function defineROP(k, value){
      Object.defineProperty(window, k, {
          get: function(){ return defines[k] },
          set: function(){ throw new Error('defines.js READ ONLY!!') }
      });
  }
  for(var k in defines){
      defineROP(k, defines[k]);
  }
})({"HOST_INDEX":"www.bdp.cn","HOST_WS":":9990","STATIC_PREFIX":"","FEATURE_ENTE
RPRISEONLY":false,"FEATURE_PERSONALONLY":false,"DARK_LAYERS":[{"url":"http://10.
107.31.127:6080/arcgis/rest/services/xfmap84/MapServer", "tileSize":512}],"LIGHT
_LAYERS":[{"url":"http://10.107.31.127:6080/arcgis/rest/services/xfmap84/MapServ
er", "tileSize":512}],"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"MAP_COORDTYPE\":\"bd
09ll\",\"MAP_TYPE\": \"ARCGIS\",\"MIN_ZOOM\":6,\"DEFAULT_CENTER\":{\"lng\":121.2
9,\"lat\":31.14},\"DEFAULT_ZOOM\":8,\"CUSTOM_CRS\": {\"code\": \"EPSG:4326\", \"
proj4def\": \"+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs\", \"options\": {
\"origin\":[-400,400],\"resolutions\": [0.07614275218656896,0.03807137609328448,
0.01903568804664224, 0.00951784402332112,0.00475892201166056,0.00237946100583028
,0.00118973050291514,5.9486525145757E-4,2.97432625728785E-4,1.5228550437313792E-
4,7.614275218656896E-5,3.807137609328448E-5,1.903568804664224E-5,9.5178440233211
2E-6,4.75892201166056E-6,2.37946100583028E-6,1.18973050291514E-6]}}}","DEBUG":fa
lse,"CUSTOM_CONFIG":"{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_T
ITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":tr
ue,\"SHOW_DATA_SCREEN\":false,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\
"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false}","BU
NDLE_MARK":0,"FEATURE_SASSONLY":false,"FEATURE_SAASONLY":false})