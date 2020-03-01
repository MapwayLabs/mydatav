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
        })({
  "HOST_INDEX": "www.bdp.cn",
  "HOST_WS": ":9990",
  "STATIC_PREFIX": "",
  "FEATURE_ENTERPRISEONLY": false,
  "FEATURE_PERSONALONLY": false,
  "GIS_CFG": '{"USE_CUSTOM_MAP":true,"MAP_COORDTYPE":"bd09ll","DEFAULT_CENTER":{"lng":113.53,"lat":29.59},"DEFAULT_ZOOM":6,"CUSTOM_CRS":{\"code\":\"EPSG:900913\",\"proj4def\":\"+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs\",\"options\":{\"origin\":[0,0],\"resolutions\":[262144, 131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]}},"DARK_LAYERS":[{"url":"http://uat-onlinemap.nbcb.com.cn:30284/maponline2.bdimg.com/tile/?qt=vtile&x={x}&y={-y}&z={z}&styles=pl&scaler=1&udt=20200225","name":"PGIS???","options":{\"tms\":false}}],"LIGHT_LAYERS":[{"url":"http://uat-onlinemap.nbcb.com.cn:30284/maponline2.bdimg.com/tile/?qt=vtile&x={x}&y={-y}&z={z}&styles=pl&scaler=1&udt=20200225","name":"PGIS???","options":{\"tms\":false}}]}',
  "DEBUG": false, 
  "CUSTOM_CONFIG": "{\"MODEL_UPDATE\":true,\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":false,\"SHOW_DATA_SCREEN\":false,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false,\"HIDE_PASSWORD_WEAK_TIP\":false,\"CREATE_USER_NO_CHECK\":true,\"HIDE_GENERATE_COORDINATE\":false,\"SHOW_DOMAIN\":true,\"DOMAIN\":\"\",\"SHOW_FRIEND_LINK\":false,\"HELP_PATH\":\"\",\"KNOWLEDGE_PATH\":\"\",\"TRAINING_PATH\":\"\",\"USE_MPS_NAV_BG\":false,\"USE_AUTHORIZED\":false,\"PICTURE_LINK\":true,\"NET_EXPORT_WORD\":true,\"SHOW_NET_ON\":true,\"COPYRIGHT_TEXT\":\"\",\"SHOW_BACKHOME\":false,\"WELCOME_TEXT\":\"\",\"LOGO_JUMP\":false,\"HIDE_BROWSER_CHECK\":true,\"SHOW_PRODUCT\":false,\"SHOW_DOWNLOAD\":false,\"TRY_BDP\":\"\",\"SHOW_FORGET_PASSWORD\":false,\"LOGIN_PATH\":\"local-login.html\",\"VIEW_MODEL\":false,\"QUERY_ENGINE\":\"default\",\"BDP_HOME\":\"\",\"GRAFT_OPEN\":false,\"CUSTOM_DOMAIN\":\"企业域\",\"LOGO_HREF_PATH\":\"#\",\"ACCOUNT_LOGIN_PATH\":\"\",\"WATER_MARK\":\"\",\"SHOW_SHARE\":true,\"SHOW_ADAPTIVE_FULL_SCREEN\":true}",
  "BUNDLE_MARK": 0,
  "FEATURE_SASSONLY": false,
  "FEATURE_SAASONLY": false
})
