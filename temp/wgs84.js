(function extendWindow(defines) {
  function defineROP(k, value) {
      Object.defineProperty(window, k, {
          get: function() {
              return defines[k]
          },
          set: function() {
              throw new Error('defines.js READ ONLY!!')
          }
      });
  }
  for (var k in defines) {
      defineROP(k, defines[k]);
  }
}
)({
"HOST_INDEX":"www.bdp.cn",
"HOST_WS":":9990",
"STATIC_PREFIX":"",
"FEATURE_ENTERPRISEONLY":false,
"FEATURE_PERSONALONLY":false,
"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"MAP_TYPE\":\"ARCGIS\",\"DEFAULT_CENTER\":{\"lng\":112.18105226767307,\"lat\":32.05266129486063},\"DEFAULT_ZOOM\":11,\"MIN_ZOOM\":11,\"MAX_ZOOM\":18,\"DARK_LAYERS\":[{\"url\":\"http://192.168.240.59:6080/arcgis/rest/services/BasicGISService/%E8%A5%84%E9%98%B3%E7%A4%BE%E7%AE%A1%E5%BB%BA%E7%AD%91%E7%89%A9%E6%A0%87%E6%B3%A8%E9%85%8D%E5%9B%BE/MapServer\",\"options\":{\"keepBuffer\":0,\"updateWhenZooming\":false, \"bounds\":[[31.21638539266471,110.75657338759893],[32.635672376218764,113.1413909321508]]}}],\"LIGHT_LAYERS\":[{\"url\":\"http://192.168.240.59:6080/arcgis/rest/services/BasicGISService/%E8%A5%84%E9%98%B3%E7%A4%BE%E7%AE%A1%E5%BB%BA%E7%AD%91%E7%89%A9%E6%A0%87%E6%B3%A8%E9%85%8D%E5%9B%BE/MapServer\",\"options\":{\"keepBuffer\":0,\"updateWhenZooming\":false, \"bounds\":[[31.21638539266471,110.75657338759893],[32.635672376218764,113.1413909321508]]}}],\"CUSTOM_CRS\":\"EPSG4326\"}",
"DEBUG":false,
"CUSTOM_CONFIG":"{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":false,\"SHOW_DATA_SCREEN\":false,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false,\"HIDE_PASSWORD_WEAK_TIP\":false,\"CREATE_USER_NO_CHECK\":true,\"HIDE_GENERATE_COORDINATE\":false,\"SHOW_DOMAIN\":true,\"DOMAIN\":\"\",\"SHOW_FRIEND_LINK\":false,\"HELP_PATH\":\"\",\"KNOWLEDGE_PATH\":\"\",\"TRAINING_PATH\":\"\",\"USE_MPS_NAV_BG\":false,\"USE_AUTHORIZED\":false,\"PICTURE_LINK\":true,\"NET_EXPORT_WORD\":true,\"SHOW_NET_ON\":true,\"COPYRIGHT_TEXT\":\"\",\"SHOW_BACKHOME\":false,\"WELCOME_TEXT\":\"\",\"LOGO_JUMP\":false,\"HIDE_BROWSER_CHECK\":true,\"SHOW_PRODUCT\":false,\"SHOW_DOWNLOAD\":false,\"TRY_BDP\":\"\",\"SHOW_FORGET_PASSWORD\":false,\"LOGIN_PATH\":\"local-login.html\",\"VIEW_MODEL\":false,\"QUERY_ENGINE\":\"default\",\"BDP_HOME\":\"\",\"GRAFT_OPEN\":false,\"CUSTOM_DOMAIN\":\"企业域\",\"LOGO_HREF_PATH\":\"#\",\"ACCOUNT_LOGIN_PATH\":\"\",\"WATER_MARK\":\"\",\"SHOW_SHARE\":true,\"SHOW_ADAPTIVE_FULL_SCREEN\":true}",
"BUNDLE_MARK":0,
"FEATURE_SASSONLY":false,
"FEATURE_SAASONLY":false
})