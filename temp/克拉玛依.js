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
"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"CUSTOM_CRS\":\"EPSG3857\",\"DEFAULT_CENTER\":{\"lng\":84.8496,\"lat\":45.6166},\"DEFAULT_ZOOM\":8,\"MIN_ZOOM\":1,\"MAX_ZOOM\":16,\"DARK_LAYERS\":[{\"url\":\"http://104.73.1.242/title/{z}/{x}/{y}.png\"}],\"LIGHT_LAYERS\":[{\"url\":\"http://104.73.1.242/title/{z}/{x}/{y}.png\"}]}",
"DEBUG": false,
"CUSTOM_CONFIG": "{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":false,\"SHOW_DATA_SCREEN\":false,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false,\"HIDE_PASSWORD_WEAK_TIP\":false,\"CREATE_USER_NO_CHECK\":true,\"HIDE_GENERATE_COORDINATE\":false,\"SHOW_DOMAIN\":true,\"DOMAIN\":\"\",\"SHOW_FRIEND_LINK\":false,\"HELP_PATH\":\"\",\"KNOWLEDGE_PATH\":\"\",\"TRAINING_PATH\":\"\",\"USE_MPS_NAV_BG\":false,\"USE_AUTHORIZED\":false,\"PICTURE_LINK\":true,\"NET_EXPORT_WORD\":true,\"SHOW_NET_ON\":true,\"COPYRIGHT_TEXT\":\"\",\"SHOW_BACKHOME\":false,\"WELCOME_TEXT\":\"\",\"LOGO_JUMP\":false,\"HIDE_BROWSER_CHECK\":true,\"SHOW_PRODUCT\":true,\"SHOW_DOWNLOAD\":false,\"TRY_BDP\":\"\",\"SHOW_FORGET_PASSWORD\":false,\"LOGIN_PATH\":\"local-login.html\",\"VIEW_MODEL\":false,\"QUERY_ENGINE\":\"default\",\"BDP_HOME\":\"\",\"GRAFT_OPEN\":false,\"CUSTOM_DOMAIN\":\"企业域\",\"LOGO_HREF_PATH\":\"#\",\"ACCOUNT_LOGIN_PATH\":\"http://176.109.24.166:8100/api/check/gen_redirect_url?pro_name=bdp&redirect=1&a=1\",\"WATER_MARK\":\"\",\"SHOW_SHARE\":true,\"SHOW_ADAPTIVE_FULL_SCREEN\":true}",
"BUNDLE_MARK": 0,
"FEATURE_SASSONLY": false,
"FEATURE_SAASONLY": false
})
