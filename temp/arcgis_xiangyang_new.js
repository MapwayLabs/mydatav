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
"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"MAP_TYPE\":\"ARCGIS\",\"DEFAULT_CENTER\":{\"lng\":111.194,\"lat\":31.740},\"DEFAULT_ZOOM\":10,\"MIN_ZOOM\":0,\"MAX_ZOOM\":18,\"DARK_LAYERS\":[{\"url\":\"http://192.168.240.59:6080/arcgis/rest/services/BasicGISService/%E4%BF%9D%E5%BA%B7%E7%A4%BE%E7%AE%A1%E5%BB%BA%E7%AD%91%E7%89%A9%E6%A0%87%E6%B3%A8%E9%85%8D%E5%9B%BE/MapServer\"}],\"LIGHT_LAYERS\":[{\"url\":\"http://192.168.240.59:6080/arcgis/rest/services/BasicGISService/%E4%BF%9D%E5%BA%B7%E7%A4%BE%E7%AE%A1%E5%BB%BA%E7%AD%91%E7%89%A9%E6%A0%87%E6%B3%A8%E9%85%8D%E5%9B%BE/MapServer\"}],\"CUSTOM_CRS\":{\"code\":\"EPSG:4490\",\"proj4def\":\"+proj=longlat +ellps=GRS80 +no_defs\",\"options\":{\"origin\":[-400.0,400.0],\"resolutions\":[0.7039144156840451,0.35195720784202256,0.1759786039210,0.08798930196050625,0.043994650980251924,0.021997325490125962,0.01099866274506,0.005499331372532086,0.002749665686264853,0.0013748328431324266,6.8741642156621,3.4370821078310665E-4,1.7185410539155332E-4,8.592705269577666E-5,4.29635263490780,2.1481763174539033E-5,1.0740881586079784E-5,5.370440794229623E-6,2.685220395925081E-6]}}}",
"DEBUG":false,
"CUSTOM_CONFIG":"{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":false,\"SHOW_DATA_SCREEN\":false,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false,\"HIDE_PASSWORD_WEAK_TIP\":false,\"CREATE_USER_NO_CHECK\":true,\"HIDE_GENERATE_COORDINATE\":false,\"SHOW_DOMAIN\":true,\"DOMAIN\":\"\",\"SHOW_FRIEND_LINK\":false,\"HELP_PATH\":\"\",\"KNOWLEDGE_PATH\":\"\",\"TRAINING_PATH\":\"\",\"USE_MPS_NAV_BG\":false,\"USE_AUTHORIZED\":false,\"PICTURE_LINK\":true,\"NET_EXPORT_WORD\":true,\"SHOW_NET_ON\":true,\"COPYRIGHT_TEXT\":\"\",\"SHOW_BACKHOME\":false,\"WELCOME_TEXT\":\"\",\"LOGO_JUMP\":false,\"HIDE_BROWSER_CHECK\":true,\"SHOW_PRODUCT\":false,\"SHOW_DOWNLOAD\":false,\"TRY_BDP\":\"\",\"SHOW_FORGET_PASSWORD\":false,\"LOGIN_PATH\":\"local-login.html\",\"VIEW_MODEL\":false,\"QUERY_ENGINE\":\"default\",\"BDP_HOME\":\"\",\"GRAFT_OPEN\":false,\"CUSTOM_DOMAIN\":\"企业域\",\"LOGO_HREF_PATH\":\"#\",\"ACCOUNT_LOGIN_PATH\":\"\",\"WATER_MARK\":\"\",\"SHOW_SHARE\":true,\"SHOW_ADAPTIVE_FULL_SCREEN\":true}",
"BUNDLE_MARK":0,
"FEATURE_SASSONLY":false,
"FEATURE_SAASONLY":false
})